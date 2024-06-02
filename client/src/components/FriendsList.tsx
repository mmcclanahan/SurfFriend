import React, { useState } from "react";
import { FriendCard } from "./FriendCard";
import { Friend } from "../types/Friend";
import "../friendSideBar.css";
export const FriendsList = () => {
  const friends: Friend[] = [
    {
      id: 1,
      displayName: "Alice",
      status: 3,
      location: "Blackies",
      sessionTime: "11:30AM",
    },
    {
      id: 2,
      displayName: "Bob",
      status: 1,
    },
    {
      id: 3,
      displayName: "Charlie",
      status: 4,
      location: "River Jetties",
      rating: 4,
      sessionTime: "1 hour ago",
    },
  ];

  const [list, setList] = useState(friends);

  return (
    <div className="friendSideBar">
      <h1>Friends List</h1>
      <div className="friendSideBar-content">
        <ul>
          {list.map((friend: Friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};
