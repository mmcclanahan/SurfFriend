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
        "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[rgba(0,0,0,0.2)] bg-white bg-opacity-80 h-16 w-16 font-medium text-black text-2xl transition-all active:translate-y-[2px] active:shadow-none"
      }
      onClick={() => {
        clickFn();
      }}
    >
      {text}
    </button>
  );
};
