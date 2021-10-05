import Head from 'next/head';
import { Dark, DP } from '../components/Dark';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header';
import { PAGE_CONTAINER } from '../utils/constants';

export const SidebarLayout = (props: any) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>Simple Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dark dp={DP.dp01}>
        <div className="flex h-screen">
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <Sidebar />
          <div className="flex flex-col flex-1 w-0">
            <Header />
            <main
              id={PAGE_CONTAINER}
              className="relative flex-1 overflow-y-auto focus:outline-none"
              tabIndex={0}
            >
              <div>{children}</div>
            </main>
          </div>
        </div>
      </Dark>
    </>
  );
};
