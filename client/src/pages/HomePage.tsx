import { useEffect } from "react";
import { RegistrationSection } from "../components/Details/RegistrationSection";
import { SurfSpotsSection } from "../components/Details/SurfSpotsSection";
import { HomePageHeader } from "../components/Details/HomePageHeader";
import { FutureFeatures } from "../components/Details/FutureFeatures";
import Background1 from "../assets/Background1.svg";

export const HomePage = () => {
  useEffect(() => {}, []);

  //..component to click on login in or sign up
  //it has a big picture of a wave or something
  //scroll down and each component has a gif of each page
  //..component for email varification details
  //..component for spots
  //mention user can add spots must before status
  //..two in one component for status and friends
  //mention users can update their status and save diary entrys to keep track of days surfed
  //component for friends
  //also you can see friends statuses
  //..component for the calendar page
  //mention users can see their surf history
  //notified by a dot on the day they surfed
  return (
    <div
      className="bg-cover bg-center h-screen overflow-auto"
      style={{ backgroundImage: `url(${Background1})` }}
    >
      <RegistrationSection />
      <SurfSpotsSection />
      <FutureFeatures />
    </div>
  );
};
