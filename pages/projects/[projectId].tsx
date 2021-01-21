import Head from "next/head";
import { useRouter } from "next/router";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import type { Page } from "../../utils/types";
import { useMST } from "../_app";
import { BreadCrumb } from "../../components/BreadCrumb";

const ProjectPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const { projectId } = router.query;
  let projectDetails = null;

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectId
    ? (projectDetails = store.projects.find(
        (project) => project.id === projectId
      ))
    : null;

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>

      <div className='pymax-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <h1 className='text-white opacity--emp text-2xl font-semibold'>
          <BreadCrumb />
        </h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        {/* <!-- Replace with your content --> */}
        <div className='py-4 text-white opacity-l-emp'>
          <p>Project ID: {projectDetails.id}</p>
          <p>Project Name: {projectDetails.name}</p>
        </div>
        {/* <!-- /End replace --> */}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

ProjectPage.Layout = SidebarLayout;

export default ProjectPage;
