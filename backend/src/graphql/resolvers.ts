import { Context } from '../context';

import {
  QueryResolvers,
  MutationResolvers,
  User,
  ChatMessage,
  SubscriptionResolvers,
} from '../@types/resolvers-types';
import { APP_SECRET, getUserId } from '../utils';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Role } from '.prisma/client';

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const messages: ChatMessage[] = [];

//@ts-ignore
const subscribers = [];
//@ts-ignore
const onMessagesUpdates = (fn) => subscribers.push(fn);

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  Subscription: SubscriptionResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    messages: () => {
      return messages;
    },
    // me: (_parent, _args, context: Context) => {
    //   const userId = context.req.userId;
    //   return context.prisma.user.findUnique({
    //     where: {
    //       id: String(userId),
    //     },
    //   });
    // },
    getUser: (_parent, args, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    getAllUsers: (_parent, _args, context: Context) => {
      const userId = getUserId(context);
      console.log({ userId });
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
    UserSignup: async (_parent, args, context: Context) => {
      const hashedPassword: string = await hash(args.password, 10);
      const user = await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: Role.Base,
        },
      });

      if (APP_SECRET) {
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      } else {
        throw new Error('Unable to generate token');
      }
    },
    UserLogin: async (_parent, args, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      //Password will be blank if the user is using OAuth
      if (!user || !user.password) {
        throw new Error(`No user found for email: ${args.email}`);
      }

      if (!args.password) {
        throw new Error('Password Required');
      }

      const passwordValid: boolean = await compare(
        args.password,
        user.password,
      );

      if (!passwordValid) {
        throw new Error('Invalid Password');
      }

      if (!APP_SECRET) {
        throw new Error('Unable to generate token');
      }

      const token = sign({ userId: user.id }, APP_SECRET);
      // 4. Set the JWT as a cookie on the response

      const resetTime = 3600000; //1 hour
      const maxAge = 1000 * 60 * 60 * 24 * 365; //365 days
      // console.log(context.res);
      context.res.cookie('token', token, {
        httpOnly: true,
        maxAge, // 1 year cookie
      });

      return {
        token: token,
        user,
      };
    },
    UserLogout: (_parent, _args, context: Context) => {
      context.res.clearCookie('token');
      return { message: 'Logged out' };
    },
    UserUpdate: (_parent, args, context: Context) => {
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

  Subscription: {
    messages: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      subscribe: (_parent, _args) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() =>
          pubsub.publish(channel, { messages: messages }),
        );
        setTimeout(() => pubsub.publish(channel, { messages: messages }), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};
