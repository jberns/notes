import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { USER_LOGIN } from '../../../graphql/mutations';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { endpoint } from '../../../utils/withData';

const client = new ApolloClient({
  uri: `http://${endpoint}`,
  cache: new InMemoryCache(),
});

export default NextAuth({
  jwt: { secret: process.env.JWT_SECRET },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        console.log(credentials);
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
