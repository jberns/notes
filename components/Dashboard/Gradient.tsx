interface IGradientProps {
  startColor: string;
}

export const Gradient = ({ startColor }: IGradientProps) => {
  return (
    <div
      className={`${startColor} absolute w-full h-48 bg-gradient-to-b to-transparent`}
    ></div>
  );
};
