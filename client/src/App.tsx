import { useState } from "react";
import { FriendsList } from "./components/FriendsList";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="page">
      <FriendsList />
      <HomePage />
    </div>
  );
}

export default App;
