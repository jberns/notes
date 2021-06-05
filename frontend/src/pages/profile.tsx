import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";
import { SignIn } from "../components/SignIn";

const Profile: Page = () => {
  const store = useMST();

  return (
    <div>
      <SignIn />
    </div>
  );
};

Profile.Layout = SidebarLayout;

export default Profile;
