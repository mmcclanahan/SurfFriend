import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { useNotification } from "../hooks/NotificationContext";
import { HeaderButton } from "./HeaderButton";
import SurfFriendPageLogo from "../assets/SurfFriendPageLogo.png";
import "../index.css";

export const Header = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { surfSpotsQuery } = useSurfSpots(1);
  const [selected, setSelected] = useState(2);

  const indexToPath = {
    1: "/status",
    2: "/",
    3: "/calendar",
  };

  const clickButton = (num: number) => {
    if (num === 1) {
      if (surfSpotsQuery.data.length === 0) {
        showNotification("Make a Surf Spot first!", 0);
        return;
      }
    }
    navigate(indexToPath[num]);
    setSelected(num);
  };

  return (
    <div className="flex justify-between h-28 pr-10 pl-10 pt-2">
      <img
        src={SurfFriendPageLogo}
        alt="SurfFriend Logo"
        className="cursor-pointer h-28"
        onClick={() => navigate("/")}
      />
      <div className="flex items-end gap-5">
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={1}
          text={"Status"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={2}
          text={"Surf Spots"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={3}
          text={"Calender"}
        />
      </div>
    </div>
  );
};
