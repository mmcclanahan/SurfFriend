import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "./FriendsList";
//import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div>
      <Header />
      <FriendsList />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
