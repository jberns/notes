import { observer } from 'mobx-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Gradient } from '../../../components/Dashboard/Gradient';
import { HeaderInput } from '../../../components/Dashboard/Header';
import Editor from '../../../components/Editor/Editor';
import { SidebarLayout } from '../../../layouts/SidebarLayout';
import { INote, IPage, IProject } from '../../../models/Project';
import type { Page } from '../../../utils/types';

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

        <Editor />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default observer(NotesPage);
