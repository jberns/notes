import { observer } from "mobx-react";
import { useMST } from "../pages/_app";
import { DocumentText, Folder } from "./Heroicons";
import { SidebarLink, SidebarType } from "./SidebarLink";

export const SidebarProjectList = observer(() => {
  const store = useMST();
  console.log(store);

  return (
    <div>
      {Array.from(store.projects.values()).map((project) => (
        //TODO add hover for active"
        <div>
          <div className=''>
            <SidebarLink
              type={SidebarType.Project}
              icon={Folder()}
              href={`/projects/${project.id}`}
              model={project}
            />
          </div>

          {Array.from(project.pages.values()).map((page) => (
            <SidebarLink
              type={SidebarType.Page}
              leftMargin='ml-10'
              icon={DocumentText()}
              href={`/projects/${project.id}/${page.id}`}
              model={page}
            />
          ))}
        </div>
      ))}
    </div>
  );
});
