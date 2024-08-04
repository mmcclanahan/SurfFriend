export interface HeaderButtonProps {
  selected: number;
  clickFn: (num: number) => void;
  index: number;
  text: string;
}

export const HeaderButton = ({
  selected,
  clickFn,
  index,
  text,
}: HeaderButtonProps) => {
  return (
    <button
      className={`text-[#FFCD29] text-xl py-2 px-4 bold rounded  border hover:border hover:border-[#FFCD29] ${
        selected === index ? "border-[#FFCD29]" : "border-transparent"
      }`}
      onClick={() => {
        clickFn(index);
      }}
    >
      {text}
    </button>
  );
};
