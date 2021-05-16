import Link from "next/link";
import { useRouter } from "next/router";
import { DP } from "./Dark";

interface IProfileMenuLinkProps {
  icon?: JSX.Element;
  href: string;
  title: string;
}

export function ProfileMenuLink(props: IProfileMenuLinkProps) {
  const { icon, href, title } = props;
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`block px-4 py-2 text-sm text-white opacity-l-emp hover:opacity-h-emp hover:${DP.dp25}`}
        role='menuitem'
      >
        {icon}
        <span>{title}</span>
      </a>
    </Link>
  );
}
