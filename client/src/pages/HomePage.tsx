import { useNavigate } from "react-router-dom";
import { SurfSpots } from "../components/SurfSpots/SurfSpots";
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-myBlack text-2xl">Welcome User!</h1>
      <SurfSpots userId={1} />
      <div className="flex flex-col max-w-lg">
        <button
          className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
          onClick={() => navigate("/status")}
        >
          Update Status
        </button>
        <button
          className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
          onClick={() => navigate("/rate")}
        >
          Rate Session
        </button>
        <button
          className="border bg-myGreenHover text-myBlack py-2 px-4 rounded hover:bg-myGreen focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
          onClick={() => navigate("/calendar")}
        >
          Calender
        </button>
      </div>
    </div>
  );
};
