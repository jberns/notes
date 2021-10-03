import { PAGE_CONTAINER } from '../utils/constants';

export const Default = (props: any) => {
  const { children } = props;
  return (
    <main
      id={PAGE_CONTAINER}
      className="relative flex-1 overflow-y-auto focus:outline-none"
      tabIndex={0}
    >
      <div>{children}</div>
    </main>
  );
};
