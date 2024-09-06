import { useState } from "react";
import { supabase } from "../../Supa/connect";
import { useNotification } from "../../hooks/NotificationContext";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Supa/queries/userQuery";

export const SignIn = ({
  setExistingUser,
}: {
  setExistingUser: (value: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await signIn(email, password);
    if (error) {
      showNotification(error.message, 0, 5000);
      return;
    }
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
