import { useState } from "react";
import { supabase } from "../../Supa/connect";
import { useNavigate } from "react-router-dom";

export const SignIn = ({ setExistingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("clicked login");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error logging in:", error.message);
      return;
    }
    console.log("User logged in:", data.user.id);
    console.log("error variable:", error);
    navigate("/spots");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center mt-8">
        <input
          type="email"
          autoComplete="email"
          name="email"
          placeholder="Email"
          className="border border-gray-400 p-2 rounded-md w-80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          className="border border-gray-400 p-2 rounded-md w-80 mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-80 mt-4"
        >
          Login
        </button>
        <button type="button" onClick={() => setExistingUser(false)}>
          Don't have an account?
        </button>
      </form>
    </div>
  );
};
