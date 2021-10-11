import { useSession } from 'next-auth/react';
import { ProfileMenu } from './ProfileMenu';

export const Nav = () => {
  const { data: session } = useSession();
  return (
    <div className="relative flex items-center justify-end flex-shrink-0 h-16 shadow z-60">
      <span className="text-white text-opacity-h-emp">
        {session?.user?.email}
      </span>
      <ProfileMenu />
    </div>
  );
};
