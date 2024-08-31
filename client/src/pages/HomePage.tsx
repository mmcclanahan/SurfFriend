import { useState, useEffect } from "react";
import { SignIn } from "../components/Register/SignIn.tsx";
import { SignUp } from "../components/Register/SignUp.tsx";
import { supabase } from "../Supa/connect.js";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  //to swap between sign in and sign up
  const [existingUser, setExistingUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        navigate("/spots");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or any loading indicator
  }
  return (
    <div>
      {existingUser ? (
        <SignIn setExistingUser={setExistingUser} />
      ) : (
        <SignUp setExistingUser={setExistingUser} />
      )}
    </div>
  );
};
