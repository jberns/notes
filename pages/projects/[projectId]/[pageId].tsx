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
