import { useState } from "react";
import { useNotification } from "../../hooks/NotificationContext";
import { Modal } from "../Modal";
import { SignIn } from "../Register/SignIn";
import { SignUp } from "../Register/SignUp";

export const RegisterModalAndButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [existingUser, setExistingUser] = useState(true);

  const clickGetStarted = () => {
    setExistingUser(false);
    setShowModal(true);
  };

  const clickLogin = () => {
    setExistingUser(true);
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="bg-[#D86B6B] hover:bg-[#D86B6B] text-black py-2 px-4 rounded"
        onClick={clickGetStarted}
      >
        Get Started
      </button>
      <button
        className="bg-[#D86B6B] hover:bg-[#D86B6B] text-black py-2 px-4 rounded"
        onClick={clickLogin}
      >
        Login
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {existingUser ? (
          <SignIn setExistingUser={setExistingUser} />
        ) : (
          <SignUp setExistingUser={setExistingUser} />
        )}
      </Modal>
    </div>
  );
};
