import { useState, useEffect } from "react";
import { RegisterModalAndButton } from "./RegisterModalAndButton";
import { supabase } from "../../Supa/connect.js";
import { useNavigate } from "react-router-dom";
import SurfFriendPageLogo from "../../assets/SurfFriendPageLogo.png";
import Background1 from "../../assets/Background1.svg";

export const RegistrationSection = () => {
  const navigate = useNavigate();

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      navigate("/spots");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div
      className="h-screen setion1"
      style={{ backgroundImage: `url(${Background1})` }}
    >
      <div className="flex justify-evenly">
        <img
          className="max-h-96"
          src={SurfFriendPageLogo}
          alt="Surf Friend Logo"
        />
        <RegisterModalAndButton />
      </div>
      <div className="welcome">
        <h3>Welcome to Surf Friend!</h3>
        <p>A surf session tracker and diary!</p>
        <p>Log in or sign up!</p>
      </div>
      <div className="comingFeatures">
        <h3>Stick around! More features coming soon:</h3>
        <ul>
          <li>Automatically save the conditions of a highly rated session.</li>
          <li>
            Push Notifications when the forecasts match your favorite sessions!
          </li>
          <li>Live feed of friend's sessions and comments.</li>
        </ul>
      </div>
    </div>
  );
};
