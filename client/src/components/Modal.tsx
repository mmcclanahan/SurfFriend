import { motion } from "framer-motion";

export const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};
