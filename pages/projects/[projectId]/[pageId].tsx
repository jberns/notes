import { observer } from "mobx-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditableBlock } from "../../../components/EditableBlockClass";
import { SidebarLayout } from "../../../layouts/SidebarLayout";
import { IPage, Note } from "../../../models/Project";
import type { Page } from "../../../utils/types";
import { uid, setCaretToEnd } from "../../../utils";
import { useMST } from "../../_app";
import { SelectMenu } from "../../../components/SelectMenu";

export interface INewBlock {
  text: string;
  tag: string;
}

//TODO Clean this up with IContentEditable Interface
export interface IAddBlock {
  index: number;
  ref: React.RefObject<HTMLInputElement> | undefined;
  newBlock: INewBlock;
}
export interface IDeleteBlock {
  id: string;
  ref: React.RefObject<HTMLInputElement> | undefined;
}

const NotesPage: Page = () => {
  const store = useMST();
  const router = useRouter();

  const [
    currentBlock,
    setCurrentBlock,
  ] = useState<React.RefObject<HTMLInputElement> | null>();

  const { projectId, pageId } = router.query;
  let projectDetails = null;
  let pageDetails: IPage | undefined | null = null;

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

  const addBlock = (props: IAddBlock): void => {
    const { index, ref, newBlock } = props;
    const newId = uid();
    pageDetails?.addNoteRef(
      Note.create({ id: newId, text: newBlock.text, tag: newBlock.tag }),
      index
    );

    if (ref) {
      setCurrentBlock(ref);
    }
  };

  const deleteBlock = (props: IDeleteBlock): void => {
    const { id, ref } = props;
    const previousBlock = ref?.current?.previousElementSibling;

    if (previousBlock) {
      //Only delete if a previous block exists, otherwise the page can have no blocks
      store.deleteNote(id);
      selectPreviousBlock(ref);
    }
  };

  const selectNextBlock = (
    ref: React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    const nextBlock = ref?.current?.nextElementSibling;
    if (nextBlock) {
      //@ts-ignore
      nextBlock?.focus();
      setCaretToEnd(nextBlock);
    }
  };

  const selectPreviousBlock = (
    ref: React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    const previousBlock = ref?.current?.previousElementSibling;

    if (previousBlock) {
      // @ts-ignore Focus is not included in element
      previousBlock.focus();
      setCaretToEnd(previousBlock);
    }
  };

  useEffect(() => {
    selectNextBlock(currentBlock);
  }, [currentBlock]);

  return projectDetails && pageDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      <div className='pymax-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <h1 className='text-white opacity--emp text-2xl font-semibold'>
          {projectDetails.name} {">"} {pageDetails.name}
        </h1>
      </div>
      <div className='pymax-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        {/* <!-- Replace with your content --> */}
        <div className='py-4 text-white opacity-l-emp'>
          {pageDetails.notes_ref.map((note, key) => {
            return (
              note && (
                <EditableBlock
                  key={note.id}
                  index={key}
                  note={note}
                  addBlock={addBlock}
                  deleteBlock={deleteBlock}
                  selectNextBlock={selectNextBlock}
                  selectPreviousBlock={selectPreviousBlock}
                />
              )
            );
          })}
        </div>
        {/* <!-- /End replace --> */}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
