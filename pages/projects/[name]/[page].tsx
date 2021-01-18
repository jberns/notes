import { observer } from "mobx-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditableBlock } from "../../../components/EditableBlock";
import { SidebarLayout } from "../../../layouts/SidebarLayout";
import { IPage, Note } from "../../../models/Project";
import type { Page } from "../../../utils/types";
import { uid } from "../../../utils/utils";
import { useMST } from "../../_app";

export interface INewBlock {
  text: string;
  tag: string;
}

const NotesPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const [currentBlock, setCurrentBlock] = useState<HTMLElement | null>();

  const { name, page } = router.query;
  let projectDetails = null;
  let pageDetails: IPage | null = null;
  console.log(router.query);

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  name ? (projectDetails = store.projects.get(name)) : null;
  // @ts-ignore
  page ? (pageDetails = projectDetails?.pages.get(page)) : null;

  const addBlock = (
    currentBlock: React.RefObject<HTMLElement>,
    newBlock: INewBlock
  ) => {
    const id = uid();
    pageDetails?.addNote(
      Note.create({ id: id, text: newBlock.text, tag: newBlock.tag })
    );

    setCurrentBlock(currentBlock.current);
  };

  useEffect(() => {
    console.log(currentBlock);
    // @ts-ignore
    currentBlock?.nextElementSibling.focus()
  });

  return projectDetails && pageDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      <p>Project ID: {projectDetails.id}</p>
      <p>Project Name: {projectDetails.name}</p>

      <p>Page ID: {pageDetails.id}</p>
      <p>Page Name: {pageDetails.name}</p>
      <br />
      <div className='Page'>
        Notes
        {Array.from(pageDetails.notes.values()).map((note, key) => {
          console.log(note.tag);
          return <EditableBlock key={key} note={note} addBlock={addBlock} />;
        })}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
