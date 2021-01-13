import Head from "next/head";
import { useMST } from "../pages/_app";
import { observer } from "mobx-react";
import { Dark } from "./Dark";

export function Sidebar() {
  const store = useMST();
  console.log(store);

  const ProjectList = observer(() => {
    return (
      <div>
        {Array.from(store.projects.values()).map((project) => (
          <div className='bg-gray-primary w-full'>
            <div className='z-0 bg-blue-100 bg-opacity-0 hover:bg-opacity-5 w-full'>
              <a
                href='#'
                className='bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              >
                {/* <!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" -->
                      <!-- Heroicon name: home --> */}
                <svg
                  className='text-gray-300 mr-3 h-6 w-6'
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
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                {project.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  });

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div className='md:hidden'>
        <div className='fixed inset-0 flex z-40'>
          {/* <!--
                Off-canvas menu overlay, show/hide based on off-canvas menu state.

                Entering: "transition-opacity ease-linear duration-300"
                  From: "opacity-0"
                  To: "opacity-100"
                Leaving: "transition-opacity ease-linear duration-300"
                  From: "opacity-100"
                  To: "opacity-0"
              --> */}
          <div className='fixed inset-0' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
          </div>
          {/* <!--
                Off-canvas menu, show/hide based on off-canvas menu state.

                Entering: "transition ease-in-out duration-300 transform"
                  From: "-translate-x-full"
                  To: "translate-x-0"
                Leaving: "transition ease-in-out duration-300 transform"
                  From: "translate-x-0"
                  To: "-translate-x-full"
              --> */}
          <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800'>
            <div className='absolute top-0 right-0 -mr-12 pt-2'>
              <button className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                <span className='sr-only'>Close sidebar</span>
                {/* <!-- Heroicon name: x --> */}
                <svg
                  className='h-6 w-6 text-white'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-shrink-0 flex items-center px-4'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                alt='Workflow'
              />
            </div>
            <div className='mt-5 flex-1 h-0 overflow-y-auto'>
              <nav className='px-2 space-y-1'>
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <a
                  href='#'
                  className='bg-gray-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" -->
                      <!-- Heroicon name: home --> */}
                  <svg
                    className='text-gray-300 mr-4 h-6 w-6'
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
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Dashboard
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: users --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6'
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
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  Team
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: folder --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6'
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
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                  Projects
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: calendar --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6'
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
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Calendar
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: inbox --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6'
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
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                  Documents
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: chart-bar --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6'
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
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
          </div>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className='flex flex-col h-0 flex-1'>
            <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                alt='Workflow'
              />
            </div>
            <div className='flex-1 flex flex-col overflow-y-auto'>
              <nav className='flex-1 px-2 py-4 bg-gray-800 space-y-1'>
                <Dark>
                  <p className='text-white'>Hello darkness my old friend!</p>
                  Crazy world
                </Dark>
                {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                {store.projects && <ProjectList />}
                <a
                  href='#'
                  className='bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" -->
                      <!-- Heroicon name: home --> */}
                  <svg
                    className='text-gray-300 mr-3 h-6 w-6'
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
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  <button
                    onClick={() =>
                      store.projects.get("1").changeName("I changed!")
                    }
                  >
                    Change Name
                  </button>
                  Dashboard
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: users --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
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
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  Team
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: folder --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
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
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                  Projects
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: calendar --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
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
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Calendar
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: inbox --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
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
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                  Documents
                </a>

                <a
                  href='#'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Heroicon name: chart-bar --> */}
                  <svg
                    className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
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
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
