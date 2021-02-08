import Head from "next/head";
import { useRouter } from "next/router";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import type { Page } from "../../utils/types";
import { useMST } from "../_app";
import { BreadCrumb } from "../../components/BreadCrumb";
import { observer } from "mobx-react";
import { INote } from "../../models/Project";

const ProjectPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const { projectId } = router.query;
  let projectDetails = null;

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectDetails = store.projects.find((project) => project.id === projectId);

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>

      <div className='px-4 mx-auto pymax-w-7xl sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-white opacity--emp'>
          <BreadCrumb />
        </h1>
      </div>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
        {/* <!-- Replace with your content --> */}
        <div className='py-4 text-white opacity-l-emp'>
          <p>Project ID: {projectDetails.id}</p>
          <p>Project Name: {projectDetails.name}</p>
          {projectDetails.allTasks().map((task: INote) => {
            return (
              <div className={`flex flex-inline`}>
                <div className={`w-24`}>{task.text}</div>
                <div className={`w-24`}>{task.assignedTo}</div>
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
