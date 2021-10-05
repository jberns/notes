import { observer } from 'mobx-react';
import { Dark, DP } from '../Dark';
import { TempLink } from '../TempLink';
import { SidebarProjectList } from './SidebarProjectList';

export const Sidebar = observer(() => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- Static sidebar for desktop --> */}
      <div className="flex flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-1 h-0 ">
            <Dark dp={DP.dp00} className="min-h-full">
              <div className="flex items-center flex-shrink-0 h-16 px-4 text-xl italic font-bold text-white opacity-h-emp">
                Project Notes
              </div>

              <nav className="flex-1 min-h-full px-2 py-4 space-y-1 overflow-y-auto">
                <TempLink />
                <SidebarProjectList />
              </nav>
            </Dark>
          </div>
        </div>
      </div>
    </div>
  );
});
