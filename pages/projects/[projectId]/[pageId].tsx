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

//TODO Clean this up with IContentEditable Interface
export interface IAddBlock {
  index: number;
  ref: React.RefObject<HTMLElement>;
  newBlock: INewBlock;
}

const NotesPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const [currentBlock, setCurrentBlock] = useState<HTMLElement | null>();

  const { projectId, pageId } = router.query;
  let projectDetails = null;
  let pageDetails: IPage | undefined | null = null;
  console.log(router.query);
  console.log("Notes", store.notes);

  // @ts-ignore
  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectId
    ? (projectDetails = store.projects.find(
        (project) => project.id === projectId
      ))
    : null;
  // @ts-ignore
  pageId
    ? (pageDetails = projectDetails?.pages.find((page) => page.id === pageId))
    : null;

  const addBlock = ({ index, ref, newBlock }: IAddBlock): void => {
    const blocks = pageDetails?.notes_ref;

    console.log("key", index);

    const newId = uid();
    pageDetails?.addNoteRef(
      Note.create({ id: newId, text: newBlock.text, tag: newBlock.tag }),
      index
    );

    setCurrentBlock(ref.current);
  };

  useEffect(() => {
    console.log(currentBlock);
    // @ts-ignore
    currentBlock?.nextElementSibling?.focus();
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
      {/* <div className='Page'>
        Notes
        {Array.from(pageDetails.notes.values()).map((note, key) => {
          console.log(note.tag);
          return <EditableBlock key={key} note={note} addBlock={addBlock} />;
        })}
      </div> */}

      <h1>Testing Notes Ref</h1>
      {console.log(pageDetails.notes_ref)}
      {pageDetails.notes_ref.map((note, key) => {
        return (
          note && <EditableBlock key={note.id} index={key} note={note} addBlock={addBlock} />
        );
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
