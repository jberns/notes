import { IPage, IProject } from '../../models/Project';
import 'twin.macro';
import { ProjectAttributesFragment } from '../../generated/graphql';
interface IProjectHeaderInputProps {
  page: ProjectAttributesFragment;
}

interface IProjectHeaderFixedProps {
  title: string;
}

export const HeaderInput = ({ page }: IProjectHeaderInputProps) => {
  // const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   page?.setName(e.currentTarget.value);
  // };

  const name = page?.name || 'Add Name';

  return (
    <input
      type="text"
      name="title"
      id="title"
      value={name}
      // onChange={onNameChange}
      tw="bg-transparent w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white border-none !ring-purple-400 !border-0 !outline-none opacity-h-emp focus:outline-none"
    ></input>
  );
};

export const HeaderFixed = ({ title }: IProjectHeaderFixedProps) => {
  return (
    <div tw="px-4 mx-auto sm:px-6 md:px-8">
      <div
        id="title"
        tw="w-full px-2 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none pt-14 opacity-h-emp focus:outline-none"
      >
        {title}
      </div>
    </div>
  );
};
