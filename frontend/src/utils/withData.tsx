import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { IncomingHttpHeaders } from 'http';

//! Web Socket Link Setup with SSR https://github.com/apollographql/subscriptions-transport-ws/issues/333

const isDev = process.env.NODE_ENV === 'development';
export const endpoint = isDev
  ? process.env.NEXT_PUBLIC_ENDPOINT
  : process.env.NEXT_PUBLIC_PROD_ENDPOINT;

// this uses apollo-link-http under the hood, so all the options here come from that package
const uploadLink = (headers: IncomingHttpHeaders | undefined) => {
  // const token = localStorage.getItem('token');
  const token = false;

  const newHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : 'hi',
  };

  console.log(newHeaders);
  return createUploadLink({
    uri: `http://${endpoint}`,
    fetchOptions: {
      credentials: 'include',
    },
    // // pass the headers along from this request. This enables SSR with logged in state
    headers: newHeaders,
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
