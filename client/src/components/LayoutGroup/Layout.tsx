import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "../FriendsSideBar/FriendsList";
import { StatusBox } from "./StatusBox";
import { ProfileBox } from "./ProfileBox";

export const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      {/* Body */}
      <div className="flex justify-center items-center bg-green-700">
        {/* left sidebar */}
        <div className="flex flex-col">
          <StatusBox />
          <ProfileBox />
        </div>

        {/* Outlet (Scrollable Content) */}
        <div className="overflow-y-auto bg-black">
          <Outlet />
        </div>

        {/* Friends List */}
        <FriendsList />
      </div>
    </div>
  );
};
