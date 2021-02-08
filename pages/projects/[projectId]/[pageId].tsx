import { values } from "mobx";
import { Observer, observer } from "mobx-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [previousBlock, setPreviousBlock] = useState<Element | null>();

  const { projectId, pageId } = router.query;
  let projectDetails: IProject | undefined | null = null;
  let pageDetails: IPage | undefined | null = null;

  // The query can return an array if the query has multiple parameters
  // https://nextjs.org/docs/routing/dynamic-routes
  projectDetails = store.projects.find((project) => project.id === projectId);

  pageDetails = projectDetails?.pages.find((page) => page.id === pageId);

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
    const previousBlock = selectPreviousElement(ref);

    if (previousBlock) {
      //Only delete if a previous block exists, otherwise the page can have no blocks
      store.deleteNote(id);
      setPreviousBlock(previousBlock);
    }
  };

  const selectNextBlock = (
    ref: React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    console.log("select next", currentBlock);
    const nextBlock =
      ref?.current?.parentElement?.nextElementSibling?.firstElementChild;
      console.log("next", nextBlock);
    if (nextBlock) {
      // @ts-ignore Focus is not included in element
      nextBlock?.focus();
      setCaretToEnd(nextBlock);
    }
  };

  const selectPreviousElement = (
    ref: React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    return ref?.current?.parentElement?.previousElementSibling
      ?.firstElementChild;
  };

  const selectPreviousBlock = (ref: Element | null | undefined) => {
    if (ref) {
      // @ts-ignore Focus is not included in element
      ref.focus();
      setCaretToEnd(ref);
    }
  };

  useEffect(() => {
    //If not clearing out the current and previous blocks, they are the same between renders and then fail to update references
    console.log("effect", currentBlock);
    selectNextBlock(currentBlock);
    setPreviousBlock(null);
  }, [currentBlock]);

  useEffect(() => {
    selectPreviousBlock(previousBlock);
    setCurrentBlock(null);
  }, [previousBlock]);

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

  const grid = 8;

  const getListStyle = (
    isDraggingOver: DroppableStateSnapshot["isDraggingOver"]
  ) => ({
    // background: isDraggingOver ? "" : "",
  });

  return projectDetails && pageDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      <div className='px-4 mx-auto pymax-w-7xl sm:px-6 md:px-8'>
        <h1 className='text-sm font-semibold text-blue-200 opacity-h-emp'>
          {projectDetails.name} {">"} {pageDetails.name}
        </h1>
      </div>

      <div className='px-4 mx-auto pymax-w-7xl sm:px-6 md:px-8'>
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
                      {pageDetails?.notes_ref.map((note, key) => {
                        return (
                          <Observer>
                            {() => (
                              <EditableBlock
                                key={note.id}
                                index={key}
                                note={note}
                                addBlock={addBlock}
                                deleteBlock={deleteBlock}
                                selectNextBlock={selectNextBlock}
                                selectPreviousElement={selectPreviousElement}
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
