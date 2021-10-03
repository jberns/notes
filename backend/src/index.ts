import { ApolloServer, CorsOptions } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { createContext } from './context';
import { NextFunction, Request, Response } from 'express';

import { typeDefs, resolvers } from './graphql';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

async function startApolloServer() {
  const app = express();

  const whitelist = [
    'http://localhost:3000',
    'https://studio.apollographql.com',
  ];

  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} Not Allowed by CORS`));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
    // const { token } = req.cookies;
    // if (token) {
    //   const { userId } = verify(token, APP_SECRET) as Token;
    //   //Put the userId onto future requests
    //   req.userId = userId;
    // }
    next();
  });

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    //@ts-ignore Graphql CodeGen is not matching
    resolvers,
    typeDefs,
  });

  //TODO UPDATE ALLOWED ORIGINS
  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return createContext(req, res);
    },
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
