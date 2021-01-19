import React from "react";

export enum DP {
  "dp00" = "bg-opacity-dp00",
  "dp01" = "bg-opacity-dp01",
  "dp02" = "bg-opacity-dp02",
  "dp04" = "bg-opacity-dp04",
  "dp06" = "bg-opacity-dp06",
  "dp08" = "bg-opacity-dp08",
  "dp12" = "bg-opacity-dp12",
  "dp16" = "bg-opacity-dp16",
  "dp25" = "bg-opacity-dp25",
  "none" = "bg-opacity-none",
}

interface IDarkProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  dp?: DP;
  hover?: string;
}

export function Dark(props: IDarkProps) {
  const { children, className, dp = DP.dp00, containerClassName="" } = props;
  let bg = "bg-gray-primary";
  let tint = "bg-blue-100";

  if (dp === DP.none) {
    bg = "";
    tint = "";
  }

  return (
    <div className={`${bg} w-full ${containerClassName}`}>
      <div className={`w-full h-full ${tint} ${dp} ${className}`}>
        {children}
      </div>
    </div>
  );
}
