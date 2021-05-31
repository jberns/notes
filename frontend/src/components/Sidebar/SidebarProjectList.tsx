import { observer } from "mobx-react";
import { useMST } from "../../pages/_app";
import { DocumentText, Folder } from "../Heroicons";
import { SidebarLink } from "./SidebarLink";
import { useQuery, gql } from "@apollo/client";
import { useAll_ProjectsQuery } from "../../generated/graphql";

export const SidebarProjectList = observer(() => {
  const store = useMST();

  const { loading, error, data } = useAll_ProjectsQuery();

  console.log(data);

  return (
    <div>
      {store.projects.map((project) => (
        //TODO add hover for active"
        <div key={project.id}>
          <SidebarLink
            key={project.id}
            icon={Folder()}
            href={`/projects/${project.id}`}
            model={project}
          />

          {project?.pages
            ? Array.from(project.pages).map((page) => (
                <SidebarLink
                  key={page.id}
                  leftMargin='ml-10'
                  icon={DocumentText()}
                  href={`/projects/${project.id}/${page.id}`}
                  model={page}
                />
              ))
            : null}
        </div>
      ))}
      <div className="text-white">
        {console.log(data)}
        {data?.getAllProjects?.map((project) => {
          return project?.name;
        })}
      </div>
    </div>
  );
});
