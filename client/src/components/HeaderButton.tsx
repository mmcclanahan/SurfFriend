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
        "h-8 w-auto transition-all active:translate-y-[2px] active:shadow-none"
      }
      onClick={() => {
        clickFn();
      }}
      icon={icon}
    />
  );
};
