import { onSnapshot } from 'mobx-state-tree';
import React, { useContext } from 'react';
import { IRootStore, RootStore } from '../models/Project';
import '../styles/globals.css';
import type { Page } from '../utils/types';
import { ApolloProvider } from '@apollo/client/react';
import withData, { loggedInTokenVar } from '../utils/withData';
import { NextPage, NextPageContext } from 'next';
import { getSession, SessionProvider } from 'next-auth/react';
import { GlobalStyles } from 'twin.macro';
import { RouteGuard } from '../components/RouteGuard';

//https://github.com/mobxjs/mobx-state-tree/issues/1363
// @ts-ignore
export const MSTContext = React.createContext<IRootStore>(null);

export const MSTProvider = MSTContext.Provider;

export function useMST() {
  const store = useContext(MSTContext);
  return store;
}
// TODO:  Remove MOBX State tree and this initial state
const LOCAL_STORAGE = 'notes';

let initialState = {};
initialState = {
  projects: [
    { id: '1', name: 'First Project' },
    { id: '2', name: 'Second Project' },
  ],
  navigation: {
    isMobileSidebarOpen: false,
  },
};

if (
  typeof window !== 'undefined' &&
  typeof localStorage.getItem(LOCAL_STORAGE) === 'string'
) {
  const json: IRootStore = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE) || '{}',
  );
  if (!RootStore.is(json)) {
    initialState = json;
  }
}

// @ts-ignore
let rootStore = RootStore.create(initialState);

onSnapshot(rootStore, (snapshot) => {
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(snapshot));
});

function MyApp({
  Component,
  pageProps,
  apollo,
}: {
  Component: Page;
  pageProps: any;
  apollo: any;
}) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <SessionProvider session={pageProps?.session}>
      <ApolloProvider client={apollo}>
        <MSTProvider value={rootStore}>
          <GlobalStyles />
          <RouteGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RouteGuard>
        </MSTProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: NextPage;
  ctx: NextPageContext;
}) {
  const session = await getSession(ctx);
  const token = session?.token;

  loggedInTokenVar(token);

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  //@ts-ignore
  pageProps.query = ctx.query;
  return pageProps;
};

//@ts-ignore
export default withData(MyApp);
