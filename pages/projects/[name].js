import Head from "next/head";
import { useRouter } from "next/router";
import { useMST } from "../_app";
import { observer } from "mobx-react";
import { Project } from "../../models/Project";
import { SidebarLayout } from "../../layouts/SidebarLayout";


const ProjectPage = () => {
  const store = useMST();
  const router = useRouter();

  const { name } = router.query;
  const projectDetails = store.projects.get(name);
  console.log(projectDetails);

  return (
    projectDetails ? (
      <div>
        <Head>
          <title>{projectDetails.name}</title>
        </Head>
        <p>Project ID: {projectDetails.id}</p>
        <p>Project Name: {projectDetails.name}</p>
      </div>
    ) : <div>Loading</div>
  );
};

ProjectPage.Layout = SidebarLayout;

export default ProjectPage;
