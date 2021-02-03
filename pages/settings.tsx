import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";

const Settings: Page = () => {
  const store = useMST();
  console.log(store);

  return (
    <div>
      <h1>This is the Settings page</h1>
    </div>
  );
};

Settings.Layout = SidebarLayout;

export default Settings;
