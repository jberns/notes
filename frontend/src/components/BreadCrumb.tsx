export function BreadCrumb() {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-4'>
        <li>
          <div className="text-white opacity-l-emp hover:opacity-h-emp">
            <a href='#' className=''>
              <svg
                className='flex-shrink-0 w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              <span className='sr-only'>Home</span>
            </a>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <svg
              className='flex-shrink-0 w-5 h-5 text-white opacity-l-emp'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
            </svg>
            <a
              href='#'
              className='ml-4 text-sm font-medium text-white opacity-l-emp hover:opacity-h-emp'
            >
              Projects
            </a>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <svg
              className='flex-shrink-0 w-5 h-5 text-white opacity-l-emp'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
            </svg>
            <a
              href='#'
              aria-current='page'
              className='ml-4 text-sm font-medium opacity-l-emp hover:opacity-h-emp'
            >
              Project Nero
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}
