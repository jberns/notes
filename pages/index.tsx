import { observer } from "mobx-react";
import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";

const Home: Page = () => {
  const store = useMST();

  return (
    <div>
      <div className='absolute w-full h-48 bg-gradient-to-b from-green-900 to-transparent'></div>

      {/* BODY */}
      <div className='px-4 mx-auto sm:px-6 md:px-8'>
        <div
          id='title'
          className='w-full px-2 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none pt-14 opacity-h-emp focus:outline-none'
        >All Projects Summary</div>
      </div>
      <div>
        {store.projects.map((project) => {
          const { name } = project;
          const open = project.openTasks().length;
          const all = project.allTasks().length;
          const pctComplete = (project.pctComplete() * 100).toFixed(0) + "%";

          return (
            <div
              className='grid grid-cols-4 gap-4 text-white opacity-h-emp'
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
