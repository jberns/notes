import { observer } from "mobx-react";
import { SidebarLayout } from "../layouts/SidebarLayout";
import type { Page } from "../utils/types";
import { useMST } from "./_app";

const Home: Page = () => {
  const store = useMST();
  return (
    <div>
      <h1>This is the home page</h1>
      {store.allTaskSummary().map((project) => {
        return (
          <div>
            {project.name} | {project.count}
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

Home.Layout = SidebarLayout;

export default observer(Home);
