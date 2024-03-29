import { useState } from 'react';
import { Dark, DP } from '../Dark';
import { ProfileMenuLink } from './ProfileMenuLink';

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative ml-3 mr-5">
      <div>
        <button
          className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>
      {/* <!--
                      Profile dropdown panel, show/hide based on dropdown state.

                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
      {isMenuOpen && (
        <div
          className="absolute right-0 z-50 w-48 p-2 origin-top-right bg-black rounded-md shadow-lg ring-1 ring-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <ProfileMenuLink href="/profile" title="Your Profile" />
          <ProfileMenuLink href="/settings" title="Settings" />
          <ProfileMenuLink href="/" title="Sign out" />
        </div>
      )}
    </div>
  );
};
