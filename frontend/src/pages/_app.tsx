import { onSnapshot } from 'mobx-state-tree';
import React, { useContext } from 'react';
import { IRootStore, RootStore } from '../models/Project';
import '../styles/globals.css';
import type { Page } from '../utils/types';
import { ApolloProvider } from '@apollo/client/react';
import withData from '../utils/withData';
import { NextPage, NextPageContext } from 'next';

//https://github.com/mobxjs/mobx-state-tree/issues/1363
// @ts-ignore
export const MSTContext = React.createContext<IRootStore>(null);

export const MSTProvider = MSTContext.Provider;

export function useMST() {
  const store = useContext(MSTContext);
  return store;
}
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
    <ApolloProvider client={apollo}>
      <MSTProvider value={rootStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MSTProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: NextPage;
  ctx: NextPageContext;
}) {
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
