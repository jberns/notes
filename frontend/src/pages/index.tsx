import { observer } from 'mobx-react';
import { SidebarLayout } from '../layouts/SidebarLayout';
import type { Page } from '../utils/types';
import { useMST } from './_app';
import { Gradient } from '../components/Dashboard/Gradient';
import { HeaderFixed } from '../components/Dashboard/Header';

const Home: Page = () => {
  const store = useMST();

  return (
    <div>
      <Gradient startColor="from-green-900" />

      <HeaderFixed title="All Projects Summary" />

      <div>
        {store.projects.map((project) => {
          const { name } = project;
          const open = project.openTasks().length;
          const all = project.allTasks().length;
          const pctComplete = (project.pctComplete() * 100).toFixed(0) + '%';

          return (
            <div
              className="grid grid-cols-4 gap-4 text-white opacity-h-emp"
              key={project.id}
            >
              <div>{name}</div>
              <div>{open}</div>
              <div>{all}</div>
              <div>{pctComplete}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Home.Layout = SidebarLayout;

export default observer(Home);
