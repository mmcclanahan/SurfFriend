import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/NotificationContext";
import { createUser } from "../../Supa/queries/userQuery";
import { createStatus } from "../../Supa/queries/statusQuery";

export const SignUp = ({
  setExistingUser,
}: {
  setExistingUser: (value: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  //need to tell user they must verify email before logging in
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data: userData, error } = await createUser(email, password);
    if (error) {
      if (error.message === "Email rate limit exceeded") {
        showNotification(
          "We've had too many sign ups! Please wait an hour",
          0,
          null
        );
      } else {
        showNotification(error.message, 0, null);
      }
      return;
    }
    showNotification("Check your email to verify your account", 1, 5000);
    const { data: statusData, error: statusError } = await createStatus(
      userData.user?.id,
      displayName
    );
    navigate("/spots");
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
