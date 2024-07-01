import { useState } from "react";
import { motion } from "framer-motion";

export const useNotification = () => {
  const [notify, setNotify] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [color, setColor] = useState("green");

  const showNotification = (
    content: string,
    newColor: string,
    duration = 2000
  ) => {
    setNotificationContent(content);
    setColor(newColor);
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, duration);
  };

  const Notification = () =>
    notify ? (
      <motion.div
        className={`notifyModal${color}`}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ scale: 0.5 }}
      >
        <div className="notifyModalContent">
          <p>{notificationContent}</p>
        </div>
      </motion.div>
    ) : null;

  return { showNotification, Notification };
};
