import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";

const Profile: Page = () => {
  const store = useMST();

  return (
    <div>
      <h1>This is the Profile page</h1>
    </div>
  );
};

Profile.Layout = SidebarLayout;

export default Profile;
