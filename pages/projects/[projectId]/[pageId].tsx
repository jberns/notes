import { values } from "mobx";
import { Observer, observer } from "mobx-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactEventHandler, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { EditableBlock } from "../../../components/EditableBlockClass";
import { SidebarLayout } from "../../../layouts/SidebarLayout";
import { INote, IPage, IProject, Note } from "../../../models/Project";
import { setCaretToEnd, uid } from "../../../utils";
import type { Page } from "../../../utils/types";
import { useMST } from "../../_app";

export interface INewBlock {
  text: string;
  tag: string;
}

//TODO Clean this up with IContentEditable Interface
export interface IAddBlock {
  index: number;
  newBlock: INewBlock;
}
export interface IDeleteBlock {
  id: string;
  index: number;
}

const NotesPage: Page = () => {
  const store = useMST();
  const router = useRouter();
  const { projectId, pageId } = router.query;

  const [selectBlock, setSelectBlock] = useState<String>();

  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  let projectDetails: IProject | undefined | null = null;
  let pageDetails: IPage | undefined | null = null;
  projectDetails = store.projects.find((project) => project.id === projectId);
  pageDetails = projectDetails?.pages.find((page) => page.id === pageId);

  const addBlock = ({index, newBlock}: IAddBlock): void => {
    const newId = uid();
    pageDetails?.addNoteRef(
      Note.create({ id: newId, text: newBlock.text, tag: newBlock.tag }),
      index
    );

    setSelectBlock(newId);
  };

  const selectNextBlock = (index: number) => {
    const nextBlock = pageDetails?.notes_ref[index + 1];
    focusBlock(nextBlock);
  };

  const selectPreviousBlock = (index: number) => {
    const prevBlock = pageDetails?.notes_ref[index - 1];
    focusBlock(prevBlock);
  };

  const deleteBlock = ({id, index}: IDeleteBlock): void => {
    const prevBlock = pageDetails?.notes_ref[index - 1];

    if (prevBlock) {
      //Only delete if a previous block exists, otherwise the page can have no blocks
      store.deleteNote(id);
      focusBlock(prevBlock);
    }
  };

  const focusBlock = (note: INote | undefined) => {
    if (note) {
      const block = document.querySelector(`#${note.id}-ce`);
      if (block) {
        //@ts-ignore for .focus() not existing on Element
        block?.focus();
        setCaretToEnd(block);
      }
    }
  };

  useEffect(() => {
    const block = document.querySelector(`#${selectBlock}-ce`);
    //@ts-ignore for .focus() not existing on Element
    block?.focus();
  }, [selectBlock]);

  const reorder = (page: IPage, startIndex: number, endIndex: number) => {
    const result = Array.from(page.notes_ref);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const blocks = reorder(
      pageDetails!,
      result.source.index,
      result.destination.index
    );

    //Page must exist is an element is being dragged
    pageDetails!.updateNoteRef(blocks);
  };

  const getListStyle = (
    isDraggingOver: DroppableStateSnapshot["isDraggingOver"]
  ) => ({
    // background: isDraggingOver ? "" : "",
  });

  const onPageRename = (e: React.FormEvent<HTMLInputElement>) => {
    pageDetails?.updateName(e.currentTarget.value);
  };

  return projectDetails && pageDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      {/* GRADIENT */}

      <div className='absolute w-full h-48 bg-gradient-to-b from-purple-900 to-transparent'></div>

      {/* BODY */}
      <div className='px-4 mx-auto sm:px-6 md:px-8'>
        <input
          type='text'
          name='title'
          id='title'
          value={pageDetails.name}
          onChange={onPageRename}
          className='w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none opacity-h-emp focus:outline-none'
        ></input>

        <div className='py-4'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, snapshot) => (
                <Observer>
                  {() => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {pageDetails?.notes_ref.map((note, index) => {
                        return (
                          <Observer key={note.id}>
                            {() => (
                              <EditableBlock
                                key={note.id}
                                index={index}
                                note={note}
                                addBlock={addBlock}
                                deleteBlock={deleteBlock}
                                selectNextBlock={selectNextBlock}
                                selectPreviousBlock={selectPreviousBlock}
                              />
                            )}
                          </Observer>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Observer>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
