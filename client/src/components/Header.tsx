import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/NotificationContext";
import { HeaderButton } from "./HeaderButton";
import SurfFriendPageLogo from "../assets/SurfFriendPageLogo.png";
import { getSpots } from "../Supa/queries/surfSpotsQuery";
import { signOut } from "../Supa/queries/userQuery";
import "../index.css";

export const Header = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [selected, setSelected] = useState<number>(() => {
    return parseInt(localStorage.getItem("selectedPage") || "2", 10);
  });

  const indexToPath: string[] = ["/status", "/spots", "/calendar"];
  const clickButton = async (num: number) => {
    if (num === 5) {
      logOut();
      return;
    }
    if (num === 1) {
      const { error, data } = await getSpots();
      if (data?.length === 0 || error) {
        showNotification("Make a Surf Spot first!", 0, 3000);
        return;
      }
    }
    navigate(indexToPath[num]);
    setSelected(num);
    localStorage.setItem("selectedPage", num.toString());
  };

  const logOut = async () => {
    const { error } = await signOut();
    if (error) {
      showNotification("Error logging out:", 0, 3000);
      return;
    }
    navigate("/");
  };

  return (
    <div className="flex justify-between h-28 pr-10 pl-10 pt-2">
      <img
        src={SurfFriendPageLogo}
        alt="SurfFriend Logo"
        className="cursor-pointer h-28"
        onClick={() => navigate("/spots")}
      />
      <div className="flex items-end gap-5">
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={0}
          text={"Status"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={1}
          text={"Surf Spots"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={2}
          text={"Calender"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={4}
          text={"Profile"}
        />
        <HeaderButton
          selected={selected}
          clickFn={clickButton}
          index={5}
          text={"Log Out"}
        />
      </div>
    </div>
  );
};
