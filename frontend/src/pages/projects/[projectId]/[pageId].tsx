import Head from 'next/head';
import { useRouter } from 'next/router';
import { Gradient } from '../../../components/Dashboard/Gradient';
import { HeaderInput } from '../../../components/Dashboard/Header';
import Editor from '../../../components/Editor/Editor';
import { usePageByIdQuery } from '../../../generated/graphql';
import { SidebarLayout } from '../../../layouts/SidebarLayout';
import type { Page } from '../../../utils/types';

const NotesPage: Page = () => {
  const router = useRouter();
  let { projectId, pageId } = router.query;

  if (typeof pageId != 'string') {
    pageId = '';
  }

  const { loading, error, data } = usePageByIdQuery({
    variables: { id: pageId },
  });
  console.warn('REFETCH DATA', { data });

  const page = data ? data.PageById : null;
  const blocksArray = page?.blocksArray || '';

  return page ? (
    <div>
      <Head>
        <title>{page.name}</title>
      </Head>
      <Gradient startColor="from-purple-900" />
      <div className="relative px-4 mx-auto sm:px-6 md:px-8">
        <HeaderInput title={page.name || 'New Page Placeholder'} />
        <Editor key={pageId} id={pageId} content={blocksArray || null} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

NotesPage.Layout = SidebarLayout;

export default NotesPage;
