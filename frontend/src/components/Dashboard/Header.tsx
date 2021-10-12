import 'twin.macro';

export const HeaderInput = ({ title }: { title: string }) => {
  // const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   page?.setName(e.currentTarget.value);
  // };

  return (
    <input
      type="text"
      name="title"
      id="title"
      value={title}
      // onChange={onNameChange}
      tw="isolate bg-transparent w-full px-2 mt-12 -mx-2 text-5xl font-semibold text-white border-none !ring-indigo-600 focus:ring-2 rounded-md !outline-none text-opacity-h-emp focus:outline-none"
    ></input>
  );
};

export const HeaderFixed = ({ title }: { title: string }) => {
  return (
    <div tw="px-4 mx-auto sm:px-6 md:px-8">
      <div
        id="title"
        tw="isolate w-full px-2 -mx-2 text-5xl font-semibold text-white bg-transparent border-none outline-none pt-14 text-opacity-h-emp focus:outline-none"
      >
        {title}
      </div>
    </div>
  );
};
