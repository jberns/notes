import {
  ApolloServer,
  CorsOptions,
  gql,
  makeExecutableSchema,
} from 'apollo-server-express';
import { Context, createContext } from './context';
import { DateTimeResolver } from 'graphql-scalars';

import { verify } from 'jsonwebtoken';
import {
  QueryResolvers,
  MutationResolvers,
  User,
} from './@types/resolvers-types';
import { APP_SECRET, getUserId } from './utils';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Role } from '.prisma/client';
import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

const typeDefs = gql`
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

  #GET
  type Query {
    me: User

    getUser(id: ID!): User
    getAllUsers: [User]

    getProject(id: ID!): Project!
    getAllProjects: [Project]
    getAllProjectsByUser(userId: ID!): [Project]
  }

  #CREATE UPDATE, DELETE
  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, name: String!, email: String!): User!
    createProject: Project!
  }

  scalar DateTime
`;

export const resolvers: Resolvers = {
  Query: {
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
  app.use((req: Request, res: Response, next: any) => {
    const { token } = req.cookies;
    if (token) {
      const { userId } = verify(token, APP_SECRET) as Token;
      //Put the userId onto future requests
      req.userId = userId;
    }
    next();
  });

  const schema = makeExecutableSchema({
    //@ts-ignore
    resolvers,
    typeDefs,
  });

  //TODO UPDATE ALLOWED ORIGINS
  const server = new ApolloServer({
    schema,
    context: createContext,
  });

  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  app.use((req: Request, res: Response) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
