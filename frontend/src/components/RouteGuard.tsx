import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { loggedInTokenVar } from '../utils/withData';

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
    //! If the user is authenticated, we are adding the token to the Apollo Cache for future requests
    loggedInTokenVar(session?.token);
    return <>{children}</>;
  }

  // TODO: Add styling for long loads
  return <div>Loading Auth ...</div>;
};
