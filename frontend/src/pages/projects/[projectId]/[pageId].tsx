import { values } from 'mobx';
import { Observer, observer } from 'mobx-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactEventHandler, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { Gradient } from '../../../components/Dashboard/Gradient';
import { HeaderInput } from '../../../components/Dashboard/Header';
import { EditableBlock } from '../../../components/EditableBlockClass';
import { SidebarLayout } from '../../../layouts/SidebarLayout';
import {
  IBlock,
  INote,
  IPage,
  IProject,
  Note,
  Block,
} from '../../../models/Project';
import { setCaretToEnd, uid } from '../../../utils';
import type { Page } from '../../../utils/types';
import { useMST } from '../../_app';
import Tiptap from '../../../components/Tiptap';

export interface INewBlock {
  text: string;
  tag: string;
}

//TODO Clean this up with IContentEditable Interface
export interface IAddBlock {
  index: number;
  newBlock: INewBlock;
}

export interface IPasteBlockReference {
  index: number;
  referenceContent: INote;
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

  return projectDetails && pageDetails ? (
    <div>
      <Head>
        <title>{projectDetails.name}</title>
      </Head>
      <Gradient startColor="from-purple-900" />
      <div className="relative px-4 mx-auto sm:px-6 md:px-8">
        <HeaderInput page={pageDetails} />

        <Tiptap />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
