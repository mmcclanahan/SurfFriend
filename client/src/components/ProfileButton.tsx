export interface ProfileButtonProps {
  selected: number;
  clickFn: () => void;
  text: string;
}

export const ProfileButton = ({
  selected,
  clickFn,
  text,
}: ProfileButtonProps) => {
  return (
    <button
      className={
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[rgba(0,0,0,0.2)] bg-white bg-opacity-80 h-12 w-12 font-medium text-black text-2xl transition-all shadow-[0px_4px_1px_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-none"
      }
      onClick={() => {
        clickFn();
      }}
    >
      {text}
    </button>
  );
};
