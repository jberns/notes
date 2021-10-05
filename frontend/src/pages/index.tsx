import { observer } from 'mobx-react';
import { SidebarLayout } from '../layouts/SidebarLayout';
import type { Page } from '../utils/types';
import { useMST } from './_app';
import { Gradient } from '../components/Dashboard/Gradient';
import { HeaderFixed } from '../components/Dashboard/Header';

const Home: Page = () => {
  return (
    <div>
      <Gradient startColor="from-green-900" />

      <HeaderFixed title="All Projects Summary" />

      <div className="p-6 text-white">Project Stuff Here</div>
    </div>
  );
};

Home.Layout = SidebarLayout;

export default observer(Home);
