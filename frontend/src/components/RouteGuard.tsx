import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

interface IRouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: IRouteGuardProps) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!isUser) {
      signIn();
    }
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }

  // TODO: Add styling for long loads
  return <div>Loading Auth ...</div>;
};
