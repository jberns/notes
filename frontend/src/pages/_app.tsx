import React from 'react';
import '../styles/globals.css';
import type { Page } from '../utils/types';
import { ApolloProvider } from '@apollo/client/react';
import withData, { loggedInTokenVar } from '../utils/withData';
import { NextPage, NextPageContext } from 'next';
import { getSession, SessionProvider } from 'next-auth/react';
import { GlobalStyles } from 'twin.macro';
import { RouteGuard } from '../components/RouteGuard';

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
        <GlobalStyles />
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
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
