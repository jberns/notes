import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dark, DP } from '../Dark';
import { ProjectAttributesFragment } from '../../generated/graphql';

interface ISidebarLinkProps {
  icon: JSX.Element;
  href: string;
  data: ProjectAttributesFragment;
  leftMargin?: string;
  children?: JSX.Element;
}

export const SidebarLink = (props: ISidebarLinkProps) => {
  const { icon, href, data, children } = props;
  const router = useRouter();

  let dp = '';
  let leftMargin = props.leftMargin || '';
  let nonActiveLink = `hover:${DP.dp04} hover:opacity-h-emp opacity-l-emp`;

  if (router.asPath === href) {
    dp = DP.dp08;
    dp = 'bg-indigo-600';
    nonActiveLink = '';
  }

  console.log({ data });

  return (
    <div
      className={`${dp} ${nonActiveLink} flex w-full items-center rounded group`}
    >
      <div className={`${leftMargin} w-full`}>
        <Link href={href} passHref>
          <div className="flex items-center px-2 py-1 text-xs font-medium text-white rounded-md cursor-pointer opacity-h-emp">
            {icon}
            <span className="ml-4">{data.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
