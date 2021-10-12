import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dark, DP } from '../Dark';
import {
  PageAttributesFragment,
  ProjectAttributesFragment,
  usePage_CreateMutation,
} from '../../generated/graphql';
import { SyntheticEvent } from 'react';
import { ALL_PROJECTS } from '../../graphql/queries';

interface ISidebarLinkProps {
  icon: JSX.Element;
  href: string;
  data: ProjectAttributesFragment | PageAttributesFragment;
  leftMargin?: string;
  children?: JSX.Element;
}

export const SidebarLink = (props: ISidebarLinkProps) => {
  const { icon, href, data, children } = props;
  const router = useRouter();

  const [createPageMutation, { loading, error, data: pageData }] =
    usePage_CreateMutation({
      variables: { projectId: data.id },
      refetchQueries: [ALL_PROJECTS],
    });

  async function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    console.log('creating page');
    const res = await createPageMutation();
    console.log(res);
  }

  let leftMargin = props.leftMargin || '';
  let nonActiveLink = `text-white hover:${DP.dp16}`;

  if (router.asPath === href) {
    nonActiveLink = 'text-white bg-indigo-600 text-opacity-h-emp shadow';
  }

  return (
    <div
      className={`${nonActiveLink} flex w-full items-center rounded cursor-pointer`}
    >
      <div className={`${leftMargin} w-full`}>
        <Link href={href} passHref>
          <div className="flex items-center w-full px-2 py-1 text-xs font-medium group">
            <span className="text-white group-hover:!text-opacity-h-emp !text-opacity-l-emp">
              {icon}
            </span>
            <span className="text-white !text-opacity-l-emp w-full ml-4 group-hover:!text-opacity-h-emp">
              {data.name}
            </span>
            {data.__typename === 'Project' && (
              <button
                onClick={handleClick}
                className="px-1 font-bold text-white rounded hover:shadow text-md hover:text-opacity-100 hover:bg-indigo-500 justify-self-end text-opacity-l-emp"
              >
                +
              </button>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
