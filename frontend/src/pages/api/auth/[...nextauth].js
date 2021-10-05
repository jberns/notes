import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { USER_LOGIN } from '../../../graphql/mutations';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { endpoint } from '../../../utils/withData';
import jwt from 'jsonwebtoken';

const client = new ApolloClient({
  uri: `http://${endpoint}`,
  cache: new InMemoryCache(),
});

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        ...token,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + maxAge,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256' });
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken = jwt.verify(token, secret, {
        algorithms: ['HS256'],
      });

      return decodedToken;
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      const encodedToken = jwt.sign(token, process.env.SECRET, {
        algorithm: 'HS256',
      });

      session.id = token.userId;
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    async jwt({ token, user, account }) {
      const isUserSignedIn = user ? true : false;

      if (isUserSignedIn) {
        token.userId = user?.id.toString();
      }

      return Promise.resolve(token);
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const userData = await client.mutate({
          mutation: USER_LOGIN,
          variables: {
            email: credentials.username,
            password: credentials.password,
          },
        });

        const { user } = userData.data.UserLogin;

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
});
