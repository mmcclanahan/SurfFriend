import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/NotificationContext";
import { HeaderButton } from "../HeaderButton";
import { ProfileButton } from "../ProfileButton";
import SurfFriendPageLogo from "../../assets/SurfFriendPageLogo.png";
import { getSpots } from "../../Supa/queries/surfSpotsQuery";
import { signOut } from "../../Supa/queries/userQuery";
import { DropDown } from "../DropDown";
import "../../index.css";
import { set } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [selected, setSelected] = useState<number>(() => {
    return parseInt(localStorage.getItem("selectedPage") || "2", 10);
  });

  const [dropdownVisible, setDropdownVisible] = useState<null | string>(null);

  const toggleDropdown = (key: string) => {
    setDropdownVisible(dropdownVisible === key ? null : key);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  //close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigationToSurfSpots = async () => {
    setDropdownVisible(null);
    navigate("/spots");
  };

  const handleNavigationToStatus = async () => {
    const { error, data } = await getSpots();
    if (data?.length === 0 || error) {
      showNotification("Error getting spots", 0, 2000);
      setDropdownVisible(null);
      return;
    }
    setDropdownVisible(null);
    navigate("/status");
  };

  const handleLogOut = async () => {
    const { error } = await signOut();
    if (error) {
      setDropdownVisible(null);
      showNotification("Error logging out:", 0, 3000);
      return;
    }
    setDropdownVisible(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center h-22 pr-10 pl-8 pt-2 border-b-2">
      <img
        src={SurfFriendPageLogo}
        alt="SurfFriend Logo"
        className="cursor-pointer h-20 w-22"
        onClick={() => navigate("/feed")}
      />
      <div className="flex gap-10 h-1">
        <div className="relative">
          <HeaderButton
            selected={selected}
            clickFn={() => navigate("/feed")}
            icon={faHouse}
          />
        </div>
        <div className="relative">
          <HeaderButton
            selected={selected}
            clickFn={() => toggleDropdown("+")}
            icon={faPlus}
          />
          {dropdownVisible === "+" && (
            <DropDown
              dropdownRef={dropdownRef}
              textAndFunctionObject={{
                "Update Status": handleNavigationToStatus,
                "Add Session": handleNavigationToStatus,
              }}
            />
          )}
        </div>
        <div className="relative">
          <HeaderButton
            selected={selected}
            clickFn={() => handleNavigationToSurfSpots()}
            icon={faMapLocationDot}
          />
        </div>
        {/*
        <HeaderButton
          selected={selected}
          clickFn={() => {}}
          text={"C"}
        />*/}
      </div>
      <div className="flex items-end gap-5">
        <div className="relative">
          <ProfileButton
            selected={selected}
            clickFn={() => toggleDropdown("Profile")}
            text={"Profile"}
          />
          {dropdownVisible === "Profile" && (
            <DropDown
              dropdownRef={dropdownRef}
              textAndFunctionObject={{
                "Log Out": handleLogOut,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
