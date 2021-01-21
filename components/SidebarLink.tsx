import { observer } from "mobx-react";
import Link from "next/link";
import { Note, Page, Project, IProject } from "../models/Project";
import { useMST } from "../pages/_app";
import { uid } from "../utils/utils";
import { Dark, DP } from "./Dark";

import { TempLink } from "./TempLink";

import { Folder, Plus } from "./Heroicons";
import { useRouter } from "next/router";

interface ISidebarLinkProps {
  icon: JSX.Element;
  href: string;
  name: string;
  leftMargin?: string;
  children?:JSX.Element;
}

export function SidebarLink(props: ISidebarLinkProps) {
  const { icon, href, name, children } = props;

  const router = useRouter();

  console.log({ router: router.pathname, href: href });

  let dp = DP.dp01;
  let leftMargin = props.leftMargin || "";
  let linkHover = `hover:opacity-h-emp`;
  let nonActiveLink = "opacity-l-emp";
  let nonActiveContainer = `hover:${DP.dp04}`;

  if (router.asPath === href) {
    dp = DP.dp08;
    linkHover = "";
    nonActiveLink = "";
    nonActiveContainer = "";
  }

  return (
    <Dark
      dp={dp}
      containerClassName={`${leftMargin} rounded-md`}
      className={`${nonActiveContainer} flex w-full inline-flex items-center rounded-md`}
    >
      <div className="w-full">
        <Link href={href}>
          <a
            className={`${linkHover} ${nonActiveLink} text-white opacity-h-emp group flex items-center text-sm px-2 py-2 font-medium rounded-md`}
          >
            {icon}
            <span className='ml-4'>{name}</span>
          </a>
        </Link>
      </div>
      <div>{children}</div>
    </Dark>
  );
}
