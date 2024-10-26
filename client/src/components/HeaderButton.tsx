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
      className={
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-[rgb(0,0,0,0.2)] bg-white bg-opacity-80 px-6 font-medium text-black text-2xl transition-all shadow-[0px_4px_1px_rgb(0,0,0,0.4)] active:translate-y-[2px] active:shadow-none"
      }
      onClick={() => {
        clickFn(index);
      }}
    >
      {text}
    </button>
  );
};
