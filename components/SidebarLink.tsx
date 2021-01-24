import Link from "next/link";
import { useRouter } from "next/router";
import { IPage, IProject, Note, Page, Project } from "../models/Project";
import { uid } from "../utils/utils";
import { Dark, DP } from "./Dark";
import { Plus } from "./Heroicons";

interface ISidebarLinkProps {
  icon: JSX.Element;
  href: string;
  model: IProject | IPage;
  leftMargin?: string;
  children?: JSX.Element;
}

export function SidebarLink(props: ISidebarLinkProps) {
  const { icon, href, model, children } = props;
  const router = useRouter();

  console.log({ router: router.pathname, href: href });

  let dp = DP.dp01;
  let leftMargin = props.leftMargin || "";
  let nonActiveLink = `hover:${DP.dp04} hover:opacity-h-emp opacity-l-emp`;

  if (router.asPath === href) {
    dp = DP.dp08;
    nonActiveLink = "";
  }

  const createNewPage = (project: IProject) => {
    const id = uid();
    const defaultNote = Note.create({
      id: id,
      text: "👋 Hey there!!",
      tag: "p",
    });

    const pageId = Math.floor(Math.random() * 100).toString();

    project.addPage(
      Page.create({
        id: pageId,
        name: `New Page - ${pageId}`,
      })
    );

    const page = project.pages.find((page) => page.id === pageId);

    page?.addNoteRef(defaultNote, 0);
  };

  const addProject = (model: IProject) => {
    return (
      <div
        className={`cursor-pointer hover:opacity-100 opacity-l-emp text-white px-2 h-full`}
        onClick={() => createNewPage(model)}
      >
        <Plus />
      </div>
    );
  };

  return (
    <Dark
      dp={dp}
      className={`${nonActiveLink} flex inline-flex w-full items-center rounded-md group`}
    >
      <div className={`${leftMargin} w-full`}>
        <Link href={href}>
          <a
            className={`flex text-white opacity-h-emp  items-center text-sm px-2 py-2 font-medium rounded-md`}
          >
            {icon}
            <span className='ml-4'>{model.name}</span>
          </a>
        </Link>
      </div>
      {Project.is(model) && addProject(model)}
    </Dark>
  );
}
