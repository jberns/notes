import Head from 'next/head';
import { useRouter } from 'next/router';
import { SidebarLayout } from '../../layouts/SidebarLayout';
import type { Page } from '../../utils/types';
import { useMST } from '../_app';
import { observer } from 'mobx-react';
import { IProject } from '../../models/Project';
import { StatsCard, StatsCardGrid } from '../../components/Dashboard/StatsCard';
import { TaskTable } from '../../components/Dashboard/TaskTable';
import { HeaderInput } from '../../components/Dashboard/Header';
import { Gradient } from '../../components/Dashboard/Gradient';

const ProjectPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const { projectId } = router.query;
  let projectDetails: IProject | undefined | null = null;

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectDetails = store.projects.find((project) => project.id === projectId);

  const openTasks = projectDetails?.openTasks().length || 0;
  const allTasks = projectDetails?.allTasks().length || 0;
  const pctComplete = projectDetails?.pctComplete() || 0;

  return projectDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>

      {/* BODY */}
      <Gradient startColor="from-blue-900" />

      <div className="px-4 mx-auto sm:px-6 md:px-8">
        <HeaderInput page={projectDetails} />

        <div className="flex flex-col">
          <div className="z-10 py-4 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <StatsCardGrid>
                <StatsCard title="Open Tasks" stat={openTasks} />
                <StatsCard title="All Tasks" stat={allTasks} />

                <StatsCard
                  title="% Complete"
                  stat={pctComplete}
                  type="percent"
                />
              </StatsCardGrid>
              <TaskTable project={projectDetails} />
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
