import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { NotificationContext } from "../hooks/NotificationContext";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notify, setNotify] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [color, setColor] = useState(1);

  const showNotification = (
    content: string,
    newColor: number,
    newTime: number | null
  ) => {
    setNotificationContent(content);
    setColor(newColor);
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, newTime || 2000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {notify && (
        <motion.div
          className={`fixed top-0 left-0 z-50 w-full h-20 flex justify-center items-center ${
            color === 1 ? "bg-green-700" : "bg-red-700"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`bg-${color}-800 p-2 rounded-lg`}>
            <p className="text-white">{notificationContent}</p>
          </div>
        </motion.div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};
