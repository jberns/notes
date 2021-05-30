import { onSnapshot } from "mobx-state-tree";
import React, { useContext } from "react";
import { IRootStore, RootStore } from "../models/Project";
import "../styles/globals.css";
import type { Page } from "../utils/types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { observer } from "mobx-react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

//https://github.com/mobxjs/mobx-state-tree/issues/1363
// @ts-ignore
export const MSTContext = React.createContext<IRootStore>(null);

export const MSTProvider = MSTContext.Provider;

export function useMST() {
  const store = useContext(MSTContext);
  return store;
}
const LOCAL_STORAGE = "notes";

let initialState = {};
initialState = {
  projects: [
    { id: "1", name: "First Project" },
    { id: "2", name: "Second Project" },
  ],
  navigation: {
    isMobileSidebarOpen: false,
  },
};

if (
  typeof window !== "undefined" &&
  typeof localStorage.getItem(LOCAL_STORAGE) === "string"
) {
  const json: IRootStore = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE) || "{}"
  );
  if (!RootStore.is(json)) initialState = json;
}

// @ts-ignore
let rootStore = RootStore.create(initialState);

onSnapshot(rootStore, (snapshot) => {
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(snapshot));
});

function MyApp({ Component, pageProps }: { Component: Page; pageProps: any }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });
  
  return (
    <ApolloProvider client={client}>
      <MSTProvider value={rootStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MSTProvider>
    </ApolloProvider>
  );
}

export default observer(MyApp);
