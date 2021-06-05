import { observer } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  IBlock,
  Block,
  IPage,
  IProject,
  Note,
  Page,
  Project,
} from '../../models/Project';
import { uid } from '../../utils';
import { Dark, DP } from '../Dark';
import { Plus } from '../Heroicons';

interface ISidebarLinkProps {
  icon: JSX.Element;
  href: string;
  model: IProject | IPage;
  leftMargin?: string;
  children?: JSX.Element;
}

export const SidebarLink = observer((props: ISidebarLinkProps) => {
  const { icon, href, model, children } = props;
  const router = useRouter();

  let dp = DP.dp01;
  let leftMargin = props.leftMargin || '';
  let nonActiveLink = `hover:${DP.dp04} hover:opacity-h-emp opacity-l-emp`;

  if (router.asPath === href) {
    dp = DP.dp08;
    nonActiveLink = '';
  }

  const createNewPage = (project: IProject) => {
    const newIdBlock = 'blk_' + uid();
    const newIdNote = 'note_' + uid();

    const pageId = Math.floor(Math.random() * 100).toString();

    project.addPage(
      Page.create({
        id: pageId,
        name: `New Page - ${pageId}`,
      }),
    );

    const page = project.pages.find((page) => page.id === pageId);

    const defaultNote = Note.create({
      id: newIdNote,
      text: '👋 Hey there!!',
      tag: 'p',
    });

    const defaultBlock = Block.create({
      id: newIdBlock,
      content: defaultNote.id,
    });

    page?.addNote(defaultNote);
    page?.addBlockRef(defaultBlock, 0);
  };

  const addProject = (model: IProject) => {
    return (
      <div
        className="min-h-full pr-2 text-white cursor-pointer hover:opacity-100 opacity-l-emp"
        onClick={() => createNewPage(model)}
      >
        <Plus />
      </div>
    );
  };

  return (
    <Dark
      dp={dp}
      className={`${nonActiveLink} flex w-full items-center rounded-md group`}
    >
      <div className={`${leftMargin} w-full`}>
        <Link href={href}>
          <div className="flex items-center px-2 py-1 text-xs font-medium text-white rounded-md cursor-pointer opacity-h-emp">
            {icon}
            <span className="ml-4">{model.name}</span>
          </div>
        </Link>
      </div>
      {Project.is(model) && addProject(model)}
    </Dark>
  );
});
