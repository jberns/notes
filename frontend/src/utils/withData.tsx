import {
  ApolloClient,
  ApolloLink,
  gql,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { IncomingHttpHeaders } from 'http';

//! Web Socket Link Setup with SSR https://github.com/apollographql/subscriptions-transport-ws/issues/333

export const typeDefs = gql`
  extend type Query {
    loggedInToken: String
  }
`;

const READ_TOKEN = gql`
  query READ_TOKEN {
    loggedInToken @client
  }
`;

const isDev = process.env.NODE_ENV === 'development';
export const endpoint = isDev
  ? process.env.NEXT_PUBLIC_ENDPOINT
  : process.env.NEXT_PUBLIC_PROD_ENDPOINT;

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const { cache } = operation.getContext();
  const token = cache.readQuery({ query: READ_TOKEN });

  console.log({ token });

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token?.loggedInToken}` : '',
    },
  }));

  return forward(operation);
});

// this uses apollo-link-http under the hood, so all the options here come from that package
const uploadLink = (headers: IncomingHttpHeaders | undefined) => {
  return createUploadLink({
    uri: `http://${endpoint}`,
    fetchOptions: {
      credentials: 'include',
    },
  });
};

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://${endpoint}`,
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = (headers: IncomingHttpHeaders | undefined) =>
  wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        uploadLink(headers),
      )
    : uploadLink(headers);

function createClient({ ctx, headers, initialState }: InitApolloOptions<any>) {
  console.log({ initialState });
  return new ApolloClient({
    link: ApolloLink.from([
      authMiddleware,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
          );
        }
      }),
      splitLink(headers),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            loggedInToken: {
              read() {
                return loggedInTokenVar();
              },
            },
          },
        },
      },
    }).restore(initialState || {}),
    connectToDevTools: isDev,
    typeDefs,
  });
}

export const loggedInTokenVar = makeVar<string>('');

//@ts-ignore
export default withApollo(createClient, { getDataFromTree });
