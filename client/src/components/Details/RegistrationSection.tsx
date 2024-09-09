import { useEffect } from "react";
import { supabase } from "../../Supa/connect.js";
import { useNavigate } from "react-router-dom";
import { RegisterModalAndButton } from "./RegisterModalAndButton.js";

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
    <div className="flex flex-col justify-center items-center h-screen bg-white bg-opacity-40">
      <h3 className="text-8xl">Welcome to Surf Friend!</h3>
      <p className="text-4xl">A surf session tracker and diary!</p>
      <RegisterModalAndButton />
      <p>Scroll down to learn more!</p>
    </div>
  );
};
