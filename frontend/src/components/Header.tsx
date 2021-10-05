import { ProfileMenu } from './ProfileMenu';

export const Header = () => {
  return (
    <div className="relative flex items-center justify-end flex-shrink-0 h-16 shadow z-60">
      <ProfileMenu />
    </div>
  );
};
