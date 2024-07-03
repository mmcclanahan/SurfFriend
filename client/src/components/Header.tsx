import { useNavigate } from "react-router-dom";
import "../styles/layout.css";
import "../index.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header p-4 bg-myGray h-20">
      <h1 className="text-myBlack text-4xl">Surf Friend</h1>
      <button
        className="bg-myYellow text-myBlack py-2 px-4 rounded hover:bg-myYellowHover focus:outline-none focus:ring-2"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};
