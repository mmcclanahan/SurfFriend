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
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="flex flex-col justify-center items-center flex-grow mt-10 pl-20 pr-20 bg-white bg-opacity-30 border  rounded-3xl  border-[rgb(0,0,0,0.2)] shadow-[1px_1px_9px_6px_rgb(0,0,0,0.4)]">
        <h3 className="text-8xl">Welcome to Surf Friend!</h3>
        <p className="text-4xl mt-6 mb-6">A surf session tracker and diary!</p>
        <RegisterModalAndButton />
      </div>
      <p className="mb-4 mt-20 text-xl">Scroll down to learn more!</p>
    </div>
  );
};
