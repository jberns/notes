import Link from 'next/link';

interface IProfileMenuLinkProps {
  icon?: JSX.Element;
  href: string;
  title: string;
}

export function ProfileMenuLink(props: IProfileMenuLinkProps) {
  const { icon, href, title } = props;

  return (
    <Link href={href}>
      <a
        className={`block rounded px-4 py-2 text-sm text-white text-opacity-l-emp !ring-opacity-100 border-opacity-100 hover:text-opacity-h-emp hover:bg-indigo-600`}
        role="menuitem"
      >
        {icon}
        <span>{title}</span>
      </a>
    </Link>
  );
}
