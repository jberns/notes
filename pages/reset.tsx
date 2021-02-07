import { SidebarLayout } from "../layouts/SidebarLayout";
import { useMST } from "./_app";
import { getSnapshot, onSnapshot } from "mobx-state-tree";
import { IRootStore, RootStore } from "../models/Project";

const Home = () => {
  const store = useMST();

  const LOCAL_STORAGE = "notes";
  let initialState = {};
  initialState = {
    projects: [
      { id: "1", name: "First Project" },
      { id: "2", name: "Second Project" },
    ],
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(initialState));
  }

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
};

Home.Layout = SidebarLayout;

export default Home;
