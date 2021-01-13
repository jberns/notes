import React, { useContext } from "react";
import "../styles/globals.css";
import { IRootStore, RootStore } from "../models/Project";

//https://github.com/mobxjs/mobx-state-tree/issues/1363
const MSTContext = React.createContext<IRootStore>(null);

export const MSTProvider = MSTContext.Provider;

export function useMST() {
  const store = useContext(MSTContext);
  return store;
}

const initialState = RootStore.create({
  projects: {
    1: { id: "1", name: "First Project" },
    2: { id: "2", name: "Second Project" },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <MSTProvider value={initialState}>
      <Component {...pageProps} />
    </MSTProvider>
  );
}

export default MyApp;
