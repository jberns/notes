import Head from 'next/head';
import { useRouter } from 'next/router';
import { SidebarLayout } from '../../layouts/SidebarLayout';
import type { Page } from '../../utils/types';
import { observer } from 'mobx-react';
import { IProject } from '../../models/Project';
import { StatsCard, StatsCardGrid } from '../../components/Dashboard/StatsCard';
import { TaskTable } from '../../components/Dashboard/TaskTable';
import { HeaderInput } from '../../components/Dashboard/Header';
import { Gradient } from '../../components/Dashboard/Gradient';
import { NextPageContext } from 'next';
import { useUnique_ProjectQuery } from '../../generated/graphql';

const ProjectPage: Page = () => {
  const router = useRouter();

  let { projectId } = router.query;

  if (typeof projectId != 'string') {
    projectId = '';
  }

  const { loading, error, data } = useUnique_ProjectQuery({
    variables: { id: projectId },
  });

  const project = data ? data?.ProjectById : null;

  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes

  return project ? (
    <div>
      <Head>
        <title>{project.name}</title>
      </Head>

      {/* BODY */}
      <Gradient startColor="from-blue-900" />

      <div className="px-4 mx-auto sm:px-6 md:px-8">
        <HeaderInput title={project?.name || 'New Project PlaceHolder'} />

        <div className="flex flex-col">
          <div className="z-10 py-4 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <StatsCardGrid>
                <StatsCard title="Open Tasks" stat={0} />
                <StatsCard title="All Tasks" stat={0} />

                <StatsCard title="% Complete" stat={0} type="percent" />
              </StatsCardGrid>
              {/* <TaskTable project={projectDetails} /> */}
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
