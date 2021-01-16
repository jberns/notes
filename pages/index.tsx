import Head from "next/head";
import { useMST } from "./_app";
import { observer } from "mobx-react";

import { Sidebar } from "../components/Sidebar";
import { SidebarLayout } from "../layouts/SidebarLayout";

const Home = () => {
  const store = useMST();
  console.log(store);

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}

Home.Layout = SidebarLayout;

export default Home;