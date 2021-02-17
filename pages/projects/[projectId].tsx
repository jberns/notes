import Head from "next/head";
import { useRouter } from "next/router";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import type { Page } from "../../utils/types";
import { useMST } from "../_app";
import { BreadCrumb } from "../../components/BreadCrumb";
import { observer } from "mobx-react";
import { INote, IProject } from "../../models/Project";

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

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>

      <div className='absolute w-full h-48 bg-gradient-to-b from-purple-900 to-transparent'></div>

      {/* BODY */}
      <div className='px-4 mx-auto sm:px-6 md:px-8'>
        {/* <!-- Replace with your content --> */}
        <input
          type='text'
          name='title'
          id='title'
          value={projectDetails.name}
          onChange={onProjectRename}
          className='w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none opacity-h-emp focus:outline-none'
        ></input>
        <div className='py-4 text-white opacity-l-emp'>
          {projectDetails.allTasks().map((task: INote) => {
            return (
              <div className={`flex flex-inline`}>
                <div className={`w-96`}>{task.text}</div>
                <div className={`w-48`}>{task.assignedTo}</div>
                <div className={`w-48`}>{task.createdOn.toDateString()}</div>
              </div>
            );
          })}
        </div>
        {/* <!-- /End replace --> */}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

ProjectPage.Layout = SidebarLayout;

export default observer(ProjectPage);
