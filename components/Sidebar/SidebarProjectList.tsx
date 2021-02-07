import { observer } from "mobx-react";
import { useMST } from "../../pages/_app";
import { DocumentText, Folder } from "../Heroicons";
import { SidebarLink } from "./SidebarLink";

export const SidebarProjectList = observer(() => {
  const store = useMST();

  return (
    <div>
      {Array.from(store.projects.values()).map((project) => (
        //TODO add hover for active"
        <div key={project.id}>
          <SidebarLink
            key={project.id}
            icon={Folder()}
            href={`/projects/${project.id}`}
            model={project}
          />

          {project?.pages ? Array.from(project.pages.values()).map((page) => (
            <SidebarLink
              key={page.id}
              leftMargin='ml-10'
              icon={DocumentText()}
              href={`/projects/${project.id}/${page.id}`}
              model={page}
            />
          )): null}
        </div>
      ))}
    </div>
  );
});
