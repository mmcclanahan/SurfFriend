import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface HeaderButtonProps {
  selected: number;
  clickFn: () => void;
  icon: IconDefinition;
}

export const HeaderButton = ({
  selected,
  clickFn,
  icon,
}: HeaderButtonProps) => {
  return (
    <FontAwesomeIcon
      className={
        "group relative inline-flex w-28 h-12 items-center justify-center overflow-hidden px-6 font-medium text-black text-2xl transition-all active:translate-y-[2px] active:shadow-none"
      }
      onClick={() => {
        clickFn();
      }}
      icon={icon}
    />
  );
};
