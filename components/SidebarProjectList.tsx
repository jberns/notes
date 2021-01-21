import { observer } from "mobx-react";
import Link from "next/link";
import { Note, Page, Project, IProject } from "../models/Project";
import { useMST } from "../pages/_app";
import { uid } from "../utils/utils";
import { Dark, DP } from "./Dark";

import { TempLink } from "./TempLink";

import { Folder, Plus, DocumentText } from "./Heroicons";
import { SidebarLink } from "./SidebarLink";

export const SidebarProjectList = observer(() => {
  const store = useMST();
  console.log(store);

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

  return (
    <div>
      {Array.from(store.projects.values()).map((project) => (
        //TODO add hover for active"
        <div>
          <div className=''>
            <SidebarLink
              icon={Folder()}
              href={`/projects/${project.id}`}
              name={project.name}
            >
              <div
                className='cursor-pointer hover:opacity-100 opacity-l-emp text-white px-2 h-full'
                onClick={() => createNewPage(project)}
              >
                <Plus />
              </div>
            </SidebarLink>
          </div>

          {Array.from(project.pages.values()).map((page) => (
            <SidebarLink
              leftMargin='ml-10'
              icon={DocumentText()}
              href={`/projects/${project.id}/${page.id}`}
              name={page.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
});
