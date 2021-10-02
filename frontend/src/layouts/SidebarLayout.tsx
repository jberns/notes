import Head from 'next/head';
import { Dark, DP } from '../components/Dark';
import { observer } from 'mobx-react';

import { Sidebar } from '../components/Sidebar/Sidebar';
import { ProfileMenu } from '../components/ProfileMenu';
import { useMST } from '../pages/_app';

import { PAGE_CONTAINER } from '../utils/constants';

export const SidebarLayout = observer((props: any) => {
  const store = useMST();
  const { children } = props;

  return (
    <div className="bg-gray-primary">
      <Head>
        <title>Simple Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dark dp={DP.dp04}>
        <div className="flex h-screen">
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <Sidebar />
          <div className="flex flex-col flex-1 w-0">
            <div className="relative flex flex-shrink-0 h-16 shadow z-60">
              <button
                className="px-4 text-gray-500 border-r border-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => store.openMobileSidebar()}
              >
                <span className="sr-only">Open sidebar</span>
                {/* <!-- Heroicon name: menu-alt-2 --> */}
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              <Dark
                dp={DP.dp02}
                className="flex justify-between flex-1 min-h-full px-4"
              >
                <div className="flex flex-1">
                  <form className="flex w-full md:ml-0" action="#" method="GET">
                    <label htmlFor="search_field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        {/* <!-- Heroicon name: search --> */}
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        id="search_field"
                        className="block w-full min-h-full py-2 pl-8 pr-3 text-gray-900 placeholder-black bg-transparent border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center ml-4 md:ml-6">
                  <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    {/* <!-- Heroicon name: bell --> */}
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  {/* <!-- Profile dropdown --> */}
                  <ProfileMenu />
                </div>
              </Dark>
            </div>
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
    </div>
  );
});
