import Head from "next/head";
import { useMST } from "../pages/_app";
import { observer } from "mobx-react";
import { Dark, DP } from "../components/Dark";

import { Sidebar } from "../components/Sidebar";

export function SidebarLayout(props) {
  const { children } = props;
  const store = useMST();

  return (
    <div className='bg-gray-primary'>
      <Head>
        <title>Hello Notes!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Dark dp={DP.dp06}>
        <div className='h-screen flex overflow-hidden'>
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <Sidebar />
          <div className='flex flex-col w-0 flex-1 overflow-hidden'>
            <div className='relative z-10 flex-shrink-0 flex h-16 shadow'>
              <button className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'>
                <span className='sr-only'>Open sidebar</span>
                {/* <!-- Heroicon name: menu-alt-2 --> */}
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 6h16M4 12h16M4 18h7'
                  />
                </svg>
              </button>
              <Dark dp={DP.dp02} className='flex-1 px-4 flex justify-between'>
                <div className='flex-1 flex'>
                  <form className='w-full flex md:ml-0' action='#' method='GET'>
                    <label htmlFor='search_field' className='sr-only'>
                      Search
                    </label>
                    <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                      <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                        {/* <!-- Heroicon name: search --> */}
                        <svg
                          className='h-5 w-5'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                            clip-rule='evenodd'
                          />
                        </svg>
                      </div>
                      <input
                        id='search_field'
                        className='bg-transparent block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-black focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                        placeholder='Search'
                        type='search'
                        name='search'
                      />
                    </div>
                  </form>
                </div>
                <div className='ml-4 flex items-center md:ml-6'>
                  <button className='p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <span className='sr-only'>View notifications</span>
                    {/* <!-- Heroicon name: bell --> */}
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                  </button>

                  {/* <!-- Profile dropdown --> */}
                  <div className='ml-3 relative'>
                    <div>
                      <button
                        className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        id='user-menu'
                        aria-haspopup='true'
                      >
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        />
                      </button>
                    </div>
                    {/* <!--
                      Profile dropdown panel, show/hide based on dropdown state.

                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
                    <div
                      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu'
                    >
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        Your Profile
                      </a>

                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        Settings
                      </a>

                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </Dark>
            </div>
              <main
                className='flex-1 relative overflow-y-auto focus:outline-none'
                tabIndex={0}
              >
                <div className='py-6'>
                  <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                    <h1 className='text-white opacity--emp text-2xl font-semibold'>
                      Dashboard
                    </h1>
                  </div>
                  <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                    {/* <!-- Replace with your content --> */}
                    <div className='py-4 text-white opacity-l-emp'>{children}</div>
                    {/* <!-- /End replace --> */}
                  </div>
                </div>
              </main>
          </div>
        </div>
      </Dark>
    </div>
  );
}
