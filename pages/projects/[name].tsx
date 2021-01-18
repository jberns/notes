import Head from "next/head";
import { useRouter } from "next/router";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import type { Page } from "../../utils/types";
import { useMST } from "../_app";


const ProjectPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const { name } = router.query;
  let projectDetails = null;
  console.log(name);

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  name ? projectDetails = store.projects.get(name) : null;

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      <p>Project ID: {projectDetails.id}</p>
      <p>Project Name: {projectDetails.name}</p>
    </div>
  ) : (
    <div>Loading</div>
  );
};

ProjectPage.Layout = SidebarLayout;

export default ProjectPage;
