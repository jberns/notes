import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import head from 'next/head';

//! Web Socket Link Setup with SSR https://github.com/apollographql/subscriptions-transport-ws/issues/333

const isDev = process.env.NODE_ENV === 'development';
export const endpoint = isDev
  ? process.env.NEXT_PUBLIC_ENDPOINT
  : process.env.NEXT_PUBLIC_PROD_ENDPOINT;

const httpLink = (headers: any) =>
  new HttpLink({
    uri: `http://${endpoint}`,
    credentials: 'include',
    headers,
  });

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://${endpoint}`,
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = (headers: any) =>
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
        httpLink(headers),
      )
    : httpLink(headers);

function createClient({
  headers,
  initialState,
}: {
  headers: any;
  initialState: any;
}) {
  return new ApolloClient({
    link: ApolloLink.from([
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
      // // this uses apollo-link-http under the hood, so all the options here come from that package
      // createUploadLink({
      //   uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
      //   credentials: 'include',
      //   // pass the headers along from this request. This enables SSR with logged in state
      //   headers,
      // }),
      splitLink(headers),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            // allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
    connectToDevTools: isDev,
  });
}

//@ts-ignore
export default withApollo(createClient, { getDataFromTree });
