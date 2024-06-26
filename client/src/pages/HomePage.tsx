import { useNavigate } from "react-router-dom";
import { SurfSpots } from "../components/SurfSpots/SurfSpots";
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <h1>Welcome User!</h1>
      <SurfSpots userId={1} />
      <div className="buttonList">
        <button onClick={() => navigate("/status")}>Update Status</button>
        <button onClick={() => navigate("/rate")}>Rate Session</button>
        <button onClick={() => navigate("/calendar")}>Calender</button>
      </div>
    </div>
  );
};
