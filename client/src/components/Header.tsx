import { useNavigate } from "react-router-dom";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { useNotification } from "../hooks/NotificationContext";
import "../styles/layout.css";
import "../index.css";

export const Header = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { surfSpotsQuery } = useSurfSpots(1);

  const clickStatus = () => {
    if (surfSpotsQuery.data.length === 0) {
      showNotification("Make a Surf Spot first!", 0);
      return;
    } else {
      navigate("/status");
    }
  };

  return (
    <div className="header p-4 h-20">
      <h1
        className="text-[#FFCD29] text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Surf Friend
      </h1>
      <button
        className="border bg-myGreenHover text-[#FFCD29] py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={clickStatus}
      >
        Status
      </button>
      <button
        className="border bg-myGreenHover text-[#FFCD29] py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={() => navigate("/")}
      >
        Surf Spots
      </button>
      <button
        className="border bg-myGreenHover text-[#FFCD29] py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={() => navigate("/calendar")}
      >
        Calender
      </button>
    </div>
  );
};
