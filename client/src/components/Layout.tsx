import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "./FriendsSideBar/FriendsList";

//import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div>
      <Header />
      <FriendsList userId={1} />
      <Outlet />
    </div>
  );
};
