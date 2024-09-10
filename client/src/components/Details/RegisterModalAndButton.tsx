import { useState } from "react";
import { useNotification } from "../../hooks/NotificationContext";
import { Modal } from "../Modal";
import { SignIn } from "../Register/SignIn";
import { SignUp } from "../Register/SignUp";

export const RegisterModalAndButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [existingUser, setExistingUser] = useState(true);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-[rgb(0,0,0,0.2)] bg-transparent px-6 font-medium text-black text-2xl transition-all shadow-[0px_4px_1px_rgb(0,0,0,0.4)] active:translate-y-[2px] active:shadow-none"
      >
        Get out there!
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
