import { observer } from "mobx-react";
import { IPage, IProject } from "../../models/Project";

interface IProjectHeaderInputProps {
  page: IProject | IPage;
}

interface IProjectHeaderFixedProps {
  title: string;
}

export const HeaderInput = observer(({ page }: IProjectHeaderInputProps) => {
  const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    page?.setName(e.currentTarget.value);
  };

  return (
    <input
      type='text'
      name='title'
      id='title'
      value={page.name}
      onChange={onNameChange}
      className='w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none opacity-h-emp focus:outline-none'
    ></input>
  );
});

export const HeaderFixed = ({ title }: IProjectHeaderFixedProps) => {
  return (
    <div className='px-4 mx-auto sm:px-6 md:px-8'>
      <div
        id='title'
        className='w-full px-2 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none pt-14 opacity-h-emp focus:outline-none'
      >
        {title}
      </div>
    </div>
  );
};
