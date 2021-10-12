import { Dark, DP } from '../Dark';
import { CreateProject } from './CreateProject';
import { SidebarProjectList } from './SidebarProjectList';

export const Sidebar = () => {
  return (
    <div className={`${DP.dp03} flex flex-col w-64`}>
      <div className="flex items-center flex-none h-16 px-4 text-xl italic font-bold text-white text-opacity-h-emp">
        Project Notes
      </div>
      <div className={`h-full overflow-auto`}>
        <nav className="px-2 py-4 space-y-1">
          <CreateProject />
          <SidebarProjectList />
        </nav>
      </div>
    </div>
  );
};
