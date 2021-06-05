import React from 'react';

export enum DP {
  'dp00' = 'bg-dark-dp01',
  'dp01' = 'bg-dark-dp01',
  'dp02' = 'bg-dark-dp02',
  'dp03' = 'bg-dark-dp03',
  'dp04' = 'bg-dark-dp04',
  'dp06' = 'bg-dark-dp06',
  'dp08' = 'bg-dark-dp08',
  'dp12' = 'bg-dark-dp12',
  'dp16' = 'bg-dark-dp16',
  'dp25' = 'bg-dark-dp25',
}

interface IDarkProps {
  children: React.ReactNode;
  className?: string;
  dp?: DP;
  role?: string;
}

export function Dark(props: IDarkProps) {
  const { children, className, dp = DP.dp00 } = props;

  return <div className={`${dp} ${className}`}>{children}</div>;
}
