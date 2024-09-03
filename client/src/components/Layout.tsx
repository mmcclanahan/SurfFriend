import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "./FriendsSideBar/FriendsList";

export const Layout = () => {
  return (
    <div>
      <Header />
      <FriendsList />
      <Outlet />
    </div>
  );
};
