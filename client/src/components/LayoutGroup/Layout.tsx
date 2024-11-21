import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "../FriendsSideBar/FriendsList";
import { StatusBox } from "./StatusBox";
import { ProfileBox } from "./ProfileBox";

export const Layout = () => {
  //status top left under header
  //same alignment at bottom left for profile tab
  //right side friends list
  return (
    <div>
      <Header />
      <StatusBox />
      <ProfileBox />
      <FriendsList />
      <Outlet />
    </div>
  );
};
