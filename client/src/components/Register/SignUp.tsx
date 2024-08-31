import { useState } from "react";
import { supabase } from "../../Supa/connect";
import { useNavigate } from "react-router-dom";

export const SignUp = ({ setExistingUser }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //need to tell user they must verify email before logging in
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      displayName: displayName,
      password: password,
    });
    if (error) {
      console.error("Error Signing up:", error.message);
      return;
    }
    console.log("User signed up and in:", data);
    //navigate("/");
    //localStorage.setItem("isAuthenticated", "true");
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col items-center mt-8">
        <input
          type="displayName"
          placeholder="Display Name"
          name="displayName"
          className="border border-gray-400 p-2 rounded-md w-80 mt-4"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="email"
          autoComplete="email"
          name="email"
          placeholder="Email"
          className="border border-gray-400 p-2 rounded-md w-80 mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          className="border border-gray-400 p-2 rounded-md w-80 mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-80 mt-4"
        >
          Sign Up
        </button>
        <button type="button" onClick={() => setExistingUser(true)}>
          Already have an account?
        </button>
      </form>
    </div>
  );
};
