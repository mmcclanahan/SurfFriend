import { useState } from "react";
import { SpotCard } from "./SpotCard";
import { CityCard } from "./CityCard";
import { useSurfSpots } from "../../hooks/useSurfSpots";
import { SurfSpot } from "../../types/types";
import { Loading } from "../Loading";
import { AddSpotForm } from "./AddSpotForm";

export const SurfSpots = ({ userId }: { userId: number }) => {
  //on render fetch all surfspots from  datatbase for user
  //get all spots by city and render out card for the city name and amount of spots in it
  //clicking on city name will render out all surfspots in that city and a button to add a new spot to that city

  //have add spot button that will add a new spot to the list
  //have a delete button that will delete the spot from the list
  //have a edit button that will allow the user to edit the spot
  const { surfSpotsQuery, handleCreateSurfSpot } = useSurfSpots(userId);
  const [selectedCity, setSelectedCity] = useState("");
  const [addingSpot, setAddingSpot] = useState(false);

  if (surfSpotsQuery.isLoading) return <Loading />;
  const surfSpots = surfSpotsQuery.data || [];

  const cities = surfSpots.reduce(
    (acc: { [key: string]: number }, spot: SurfSpot) => {
      if (!acc[spot.city]) {
        acc[spot.city] = 0;
      }
      acc[spot.city]++;
      return acc;
    },
    {}
  );

  const selectCity = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h3>{selectedCity ? `${selectedCity}` : "Your Surf Spots"}</h3>
      <button onClick={() => setAddingSpot(true)}>Add Spot</button>
      {addingSpot && (
        <AddSpotForm
          createSpot={handleCreateSurfSpot}
          userId={userId}
          cities={Object.keys(cities)}
          surfSpots={surfSpots}
        />
      )}
      {selectedCity && (
        <button onClick={() => selectCity("")}>Show Cities</button>
      )}

      {selectedCity
        ? surfSpots
            .filter((spot: SurfSpot) => spot.city === selectedCity)
            .map((spot: SurfSpot) => <SpotCard key={spot.id} spot={spot} />)
        : Object.keys(cities).map((city) => (
            <CityCard
              key={city}
              selectCity={selectCity}
              city={city}
              spots={cities[city]}
            />
          ))}
    </div>
  );
};
