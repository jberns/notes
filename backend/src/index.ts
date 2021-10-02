import { ApolloServer, CorsOptions, gql } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';

import { Context, createContext } from './context';
import { DateTimeResolver } from 'graphql-scalars';

import { verify } from 'jsonwebtoken';
import {
  QueryResolvers,
  MutationResolvers,
  User,
  ChatMessage,
} from './@types/resolvers-types';
import { APP_SECRET, getUserId } from './utils';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Role } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const messages: ChatMessage[] = [];

//@ts-ignore
const subscribers = [];
//@ts-ignore
const onMessagesUpdates = (fn) => subscribers.push(fn);

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

const typeDefs = gql`
  type ChatMessage {
    id: ID!
    user: String!
    content: String!
  }

  enum NoteType {
    Note
    Task
  }

  enum Role {
    Admin
    Base
    Premium
    Enterprise
  }

  type User {
    id: ID!
    email: String
    name: String
    # creatorNotes: [Note]!
    # assignedNotes: [Note]!
    # projectOwner: [Project]!
    # projectTeam: [Project]!
    role: Role!
    # profile: Profile
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  # type Profile {
  #   id: Int!
  # }

  type Project {
    id: ID!
    name: String
    icon: String
    pages: Page
    team: [User]
    owner: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Page {
    id: ID!
    name: String
    icon: String
    blocksArray: String
    project: Project!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Block {
    id: ID!
    name: String
    content: Note
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Note {
    id: ID!
    text: String
    tag: String
    type: NoteType
    creator: User
    assigned: User
    complete: Boolean
    block: Block
    createdAt: DateTime
    updatedAt: DateTime
  }

  type ResponseMessage {
    message: String!
  }

  #GET
  type Query {
    messages: [ChatMessage!]

    me: User

    getUser(id: ID!): User
    getAllUsers: [User]

    getProject(id: ID!): Project!
    getAllProjects: [Project]
    getAllProjectsByUser(userId: ID!): [Project]
  }

  #CREATE UPDATE, DELETE
  type Mutation {
    postMessage(user: String!, content: String!): ID!
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: ResponseMessage!
    updateUser(id: ID!, name: String!, email: String!): User!
    createProject: Project!
  }

  type Subscription {
    messages: [ChatMessage!]
  }

  scalar DateTime
`;

export const resolvers: Resolvers = {
  Query: {
    messages: () => {
      return messages;
    },
    me: (_parent, _args, context: Context) => {
      const userId = context.req.userId;
      return context.prisma.user.findUnique({
        where: {
          id: String(userId),
        },
      });
    },
    getUser: (_parent, args, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    getAllUsers: (_parent, _args, context: Context) => {
      const userId = getUserId(context);
      console.log(userId);
      return context.prisma.user.findMany();
    },

    getAllProjects: (_parent, _args, context: Context) => {
      return context.prisma.project.findMany({
        include: { owner: true },
      });
    },
  },

  Mutation: {
    postMessage: (_parent, args) => {
      const { user, content } = args;
      const id = messages.length.toString();
      messages.push({
        id,
        user,
        content,
      });
      //@ts-ignore
      subscribers.forEach((fn) => {
        fn();
      });
      return id;
    },
    signup: async (_parent, args, context: Context) => {
      const hashedPassword: string = await hash(args.password, 10);
      const user = await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: Role.Base,
        },
      });

      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
    login: async (_parent, args, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error(`No user found for email: ${args.email}`);
      }

      const passwordValid: boolean = await compare(
        args.password,
        user.password,
      );

      if (!passwordValid) {
        throw new Error('Invalid Password');
      }

      const token = sign({ userId: user.id }, APP_SECRET);
      // 4. Set the JWT as a cookie on the response

      const resetTime = 3600000; //1 hour
      const maxAge = 1000 * 60 * 60 * 24 * 365; //365 days

      console.log(context.res.cookie);

      context.res.cookie('token', token, {
        httpOnly: true,
        maxAge, // 1 year cookie
      });

      return {
        token: token,
        user,
      };
    },
    logout: (_parent, _args, context: Context) => {
      context.res.clearCookie('token');
      return { message: 'Logged out' };
    },
    updateUser: (_parent, args, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    createProject: (_parent, _args, context: Context) => {
      return context.prisma.project.create({
        data: {
          name: 'New Project',
          owner: {
            connect: { email: 'alice@prisma.io' },
          },
        },
        include: { owner: true },
      });
    },
  },

  //@ts-ignore
  Subscription: {
    messages: {
      //@ts-ignore
      subscribe: (parent, args) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() =>
          pubsub.publish(channel, { messages: messages }),
        );
        setTimeout(
          () => pubsub.publish(channel, { messages: messages }),
          0,
        );
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

async function startApolloServer() {
  interface Token {
    userId: string;
  }

  const app = express();

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (token) {
      const { userId } = verify(token, APP_SECRET) as Token;
      //Put the userId onto future requests
      req.userId = userId;
    }
    next();
  });

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    //@ts-ignore
    resolvers,
    typeDefs,
  });

  //TODO UPDATE ALLOWED ORIGINS
  const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
      {
        //@ts-ignore
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  );

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });

  // app.use((req: Request, res: Response) => {
  //   res.status(200);
  //   res.send('Hello!');
  //   res.end();
  // });

  httpServer.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
  return { server, app };
}

startApolloServer().catch((err) => {
  console.error(err);
});
