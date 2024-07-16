import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "./FriendsSideBar/FriendsList";
import { NotificationProvider } from "../providers/NotificationProvider";

export const Layout = () => {
  return (
    <div>
      <NotificationProvider>
        <Header />
        <FriendsList userId={1} />
        <Outlet />
      </NotificationProvider>
    </div>
  );
};
