import { useGet_All_UsersQuery } from '../generated/graphql';
import { SidebarLayout } from '../layouts/SidebarLayout';
import type { Page } from '../utils/types';
import { useMST } from './_app';

const Settings: Page = () => {
  const store = useMST();

  const { loading, error, data } = useGet_All_UsersQuery();

  return (
    <div className="text-white">
      <h1>This is the Settings page</h1>
      {data?.getAllUsers?.map((user) => {
        return (
          <div key={user?.id}>
            {user?.email} - {user?.id}
          </div>
        );
      })}
    </div>
  );
};

Settings.Layout = SidebarLayout;

export default Settings;
