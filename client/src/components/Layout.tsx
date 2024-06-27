import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FriendsList } from "./FriendsSideBar/FriendsList";
import { NotificationHeader } from "./NotificationHeader";
//import { Footer } from "./Footer";

export const Layout = () => {
  const [notification, setNotification] = useState<{
    message: string;
    positive: boolean;
  } | null>(null);

  return (
    <div>
      <Header />
      {notification && (
        <NotificationHeader
          message={notification.message}
          positive={notification.positive}
        />
      )}
      <FriendsList userId={1} />
      <Outlet context={{ setNotification }} />
    </div>
  );
};
