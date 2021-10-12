import { DocumentText, Folder } from '../Heroicons';
import { SidebarLink } from './SidebarLink';
import { useAll_ProjectsQuery } from '../../generated/graphql';

export const SidebarProjectList = () => {
  const { loading, error, data } = useAll_ProjectsQuery();
  const projects = data?.ProjectsAllByLoggedInUser;
  console.log({ projects });

  return (
    <div>
      {projects?.map(
        (project) =>
          //TODO add hover for active"
          project && (
            <div key={project.id}>
              <SidebarLink
                key={project.id}
                icon={Folder()}
                href={`/projects/${project?.id}`}
                data={project}
              />

              {project?.pages?.map(
                (page) =>
                  page && (
                    <SidebarLink
                      key={page.id}
                      leftMargin="ml-10"
                      icon={DocumentText()}
                      href={`/projects/${project.id}/${page.id}`}
                      data={page}
                    />
                  ),
              )}
            </div>
          ),
      )}
    </div>
  );
};
