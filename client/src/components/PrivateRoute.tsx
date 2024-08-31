import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../Supa/connect.js";

export const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};
