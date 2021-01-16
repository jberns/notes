import React from "react";

export enum DP {
  "dp00" = "bg-opacity-00",
  "dp01" = "bg-opacity-01",
  "dp02" = "bg-opacity-02",
  "dp04" = "bg-opacity-04",
  "dp06" = "bg-opacity-06",
  "dp08" = "bg-opacity-08",
  "dp12" = "bg-opacity-12",
  "dp16" = "bg-opacity-16",
  "dp25" = "bg-opacity-25",
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
  const { children, className, dp = DP.dp00, containerClassName } = props;
  let bg = "bg-gray-primary";
  let tint = "bg-blue-100";

  if (dp === DP.none) {
    bg = "";
    tint = "";
  }

  return (
    <div className={`${bg} w-full h-full ${containerClassName}`}>
      <div className={`w-full h-full ${tint} ${dp} ${className}`}>
        {children}
      </div>
    </div>
  );
}
