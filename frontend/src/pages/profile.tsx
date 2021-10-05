import { SidebarLayout } from '../layouts/SidebarLayout';
import type { Page } from '../utils/types';

const Profile: Page = () => {
  return <div>Profile Page</div>;
};

Profile.Layout = SidebarLayout;

export default Profile;
