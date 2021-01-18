import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";

const Home: Page = () => {
  const store = useMST();
  console.log(store);

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
};

Home.Layout = SidebarLayout;

export default Home;
