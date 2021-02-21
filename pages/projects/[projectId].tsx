import Head from "next/head";
import { useRouter } from "next/router";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import type { Page } from "../../utils/types";
import { useMST } from "../_app";
import { BreadCrumb } from "../../components/BreadCrumb";
import { observer } from "mobx-react";
import { INote, IProject } from "../../models/Project";
import { DP } from "../../components/Dark";
import { StatsCard } from "../../components/Dashboard/StatsCard";

const ProjectPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const { projectId } = router.query;
  let projectDetails: IProject | undefined | null = null;

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectDetails = store.projects.find((project) => project.id === projectId);

  const onProjectRename = (e: React.FormEvent<HTMLInputElement>) => {
    projectDetails?.changeName(e.currentTarget.value);
  };

  const openTasks = projectDetails?.openTasks().length || 0;
  const allTasks = projectDetails?.allTasks().length || 0 ;
  const pctComplete = projectDetails?.pctComplete() || 0 ;

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>

      {/* BODY */}
      <div className='absolute w-full h-48 bg-gradient-to-b from-blue-900 to-transparent'></div>

      <div className='px-4 mx-auto sm:px-6 md:px-8'>
        <input
          type='text'
          name='title'
          id='title'
          value={projectDetails.name}
          onChange={onProjectRename}
          className='w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none opacity-h-emp focus:outline-none'
        ></input>

        <div className='flex flex-col'>
          <div className='z-10 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full align-middle sm:px-6 lg:px-8'>
              <dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3'>
                <StatsCard
                  title='Open Tasks'
                  stat={openTasks}
                />
                <StatsCard
                  title='All Tasks'
                  stat={allTasks}
                />

                <StatsCard
                  title='% Complete'
                  stat={pctComplete}
                  type="percent"
                />
              </dl>
              <div className='mt-5 overflow-hidden border-b border-gray-900 shadow sm:rounded-lg'>
                <table className='w-full divide-y divide-gray-900 table-fixed'>
                  <thead className={DP.dp12}>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-xs font-medium tracking-wider text-left text-center text-white uppercase w-28 w-30 opacity-lemp'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp'
                      >
                        Description
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp'
                      >
                        Assigned
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp'
                      >
                        Due
                      </th>
                      <th scope='col' className='relative w-1/5 px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-900 ${DP.dp16}`}>
                    {projectDetails.allTasks().map((task: INote) => {
                      return (
                        <tr key={task.id}>
                          <td className='text-sm font-medium text-white opacity-h-emp whitespace-nowrap'>
                            <label className='inline-flex w-full'>
                              <input
                                type='checkbox'
                                className='w-5 h-5 m-auto text-purple-600 bg-gray-200 rounded form-checkbox'
                                checked={task.complete}
                                onChange={(e) => {
                                  task.updateStatus(!task.complete);
                                }}
                              />
                            </label>
                          </td>
                          <td className='px-6 py-4 text-sm text-white opacity-h-emp'>
                            {task.text}
                          </td>
                          <td className='px-6 py-4 text-sm text-white opacity-h-emp whitespace-nowrap'>
                            {task.assignedTo}
                          </td>
                          <td className='px-6 py-4 text-sm text-white opacity-h-emp whitespace-nowrap'>
                            {task.createdOn.toDateString()}
                          </td>
                          <td className='px-6 py-4 text-sm font-medium text-right'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

ProjectPage.Layout = SidebarLayout;

export default observer(ProjectPage);
