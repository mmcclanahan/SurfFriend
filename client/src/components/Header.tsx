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
    <div className="header p-4 bg-myGray h-20">
      <h1
        className="text-myBlack text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Surf Friend
      </h1>
      <button
        className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={clickStatus}
      >
        Status
      </button>
      <button
        className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={() => navigate("/")}
      >
        Surf Spots
      </button>
      <button
        className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={() => navigate("/calendar")}
      >
        Calender
      </button>
    </div>
  );
};
