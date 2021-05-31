import { observer } from "mobx-react";
import { useMST } from "../../pages/_app";
import { Dark, DP } from "../Dark";
import { TempLink } from "../TempLink";
import { SidebarMobileMenu } from "./SidebarMobileMenu";
import { SidebarProjectList } from "./SidebarProjectList";

export const Sidebar = observer(() => {
  const store = useMST();

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      {store.navigation.isMobileSidebarOpen && <SidebarMobileMenu />}

      {/* <!-- Static sidebar for desktop --> */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className='flex flex-col flex-1 h-0'>
            <Dark dp={DP.dp01}>
              <div className='flex items-center flex-shrink-0 h-16 px-4'>
                <span className='text-xl italic font-bold text-white opacity-h-emp'>
                  Project Notes
                </span>
              </div>
            </Dark>
            <Dark
              dp={DP.dp01}
              className='flex flex-col flex-1 min-h-full overflow-y-auto'
            >
              <nav className='flex-1 min-h-full px-2 py-4 space-y-1'>
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
