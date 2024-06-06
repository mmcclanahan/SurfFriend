import { useNavigate } from "react-router-dom";
import "../styles/layout.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1>Surf Friend</h1>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};
