import Link from "next/link";
import { Project } from "../models/Project";
import { useMST } from "../pages/_app";

export function TempLink() {
  const store = useMST();

  return (
    <div>
      {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
      <Link href='/'>
        <a
          href='#'
          className='text-white opacity-l-emp group flex items-center px-2 py-2 text-sm font-medium rounded-md'
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
          Dashboard
        </a>
      </Link>

      <a
        href='#'
        className='text-white opacity-l-emp group flex items-center px-2 py-2 text-sm font-medium rounded-md'
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
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          />
        </svg>
        <button
          onClick={() => {
            const project = store.projects[1];
            project ? project.changeName("I Changed temp link!") : null;
          }}
        >
          Change Name
        </button>
        <button
          onClick={() => {
            const projectId = Math.floor(Math.random() * 100).toString();

            return store.addProject(
              Project.create({
                id: projectId,
                name: `New Project - ${projectId}`,
              })
            );
          }}
        >
          Add Project
        </button>
      </a>
    </div>
  );
}
