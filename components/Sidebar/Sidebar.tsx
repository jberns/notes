import { observer } from "mobx-react";
import { useMST } from "../../pages/_app";
import { Dark, DP } from "../Dark";
import { TempLink } from "../TempLink";
import { SidebarMobileMenu } from "./SidebarMobileMenu";
import { SidebarProjectList } from "./SidebarProjectList";

export const Sidebar = observer(() => {
  const store = useMST();

  return (
    <div className='h-screen flex overflow-hidden'>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      {store.navigation.isMobileSidebarOpen && <SidebarMobileMenu />}

      {/* <!-- Static sidebar for desktop --> */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-72'>
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className='flex flex-col h-0 flex-1'>
            <Dark dp={DP.dp01}>
              <div className='flex items-center h-16 flex-shrink-0 px-4'>
                <span className='text-blue-200 opacity-h-emp italic font-bold text-xl'>
                  Project Notes
                </span>
              </div>
            </Dark>
            <Dark
              dp={DP.dp01}
              className='flex-1 flex flex-col overflow-y-auto h-full'
            >
              <nav className='flex-1 px-2 py-4 space-y-1 h-full'>
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
