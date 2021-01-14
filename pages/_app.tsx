import React, { useContext } from "react";
import "../styles/globals.css";
import { IRootStore, RootStore } from "../models/Project";
import { onSnapshot, getSnapshot, addMiddleware } from "mobx-state-tree";

const LOCAL_STORAGE = "notes";

//https://github.com/mobxjs/mobx-state-tree/issues/1363
const MSTContext = React.createContext<IRootStore>(null);

export const MSTProvider = MSTContext.Provider;

export function useMST() {
  const store = useContext(MSTContext);
  return store;
}

let initialState = {}
initialState = {
  projects: {
    1: { id: "1", name: "First Project" },
    2: { id: "2", name: "Second Project" },
  },
};

if (
  typeof window !== "undefined" &&
  typeof localStorage.getItem(LOCAL_STORAGE) === "string"
) {
  const json: IRootStore = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE) || "{}"
  );
  if (RootStore.is(json)) initialState = json;
}

let rootStore = RootStore.create(initialState);

onSnapshot(rootStore, (snapshot) => {
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(snapshot));
});

function MyApp({ Component, pageProps }) {
  return (
    <MSTProvider value={rootStore}>
      <Component {...pageProps} />
    </MSTProvider>
  );
}

export default MyApp;
