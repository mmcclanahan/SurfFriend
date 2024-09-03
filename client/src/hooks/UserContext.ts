import { createContext, useContext } from "react";

//define the shape of the context
interface UserContextType {
  userId: string;
  setUserId: (id: string) => void;
}

//create the context with an undefined initial value
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

//custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
