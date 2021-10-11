import { Dark, DP } from '../Dark';
import { CreateProject } from './CreateProject';
import { SidebarProjectList } from './SidebarProjectList';

export const Sidebar = () => {
  return (
    <div className="flex">
      {/* <!-- Static sidebar for desktop --> */}
      <div className="flex">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-1">
            <Dark dp={DP.dp03} className="h-screen overflow-y-auto">
              <div className="flex items-center h-16 px-4 text-xl italic font-bold text-white opacity-h-emp">
                Project Notes
              </div>

              <nav className="px-2 py-4 space-y-1 overflow-y-auto">
                <CreateProject />
                <SidebarProjectList />
              </nav>
            </Dark>
          </div>
        </div>
      </div>
    </div>
  );
};
