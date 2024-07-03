import { useState } from "react";
import { SpotCard } from "./SpotCard";
import { CityCard } from "./CityCard";
import { useSurfSpots } from "../../hooks/useSurfSpots";
import { SurfSpot } from "../../types/types";
import { Loading } from "../Loading";
import { AddSpotForm } from "./AddSpotForm";

export const SurfSpots = ({ userId }: { userId: number }) => {
  const { surfSpotsQuery, handleCreateSurfSpot } = useSurfSpots(userId);
  const [selectedCity, setSelectedCity] = useState("");
  const [showSpotForm, setShowSpotForm] = useState(false);

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
    <div className="flex-col items-center">
      <div className="flex justify-evenly">
        <h3 className="text-myBlack text-4xl">
          {selectedCity ? `${selectedCity}` : "Your Surf Spots"}
        </h3>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={() => setShowSpotForm(true)}
        >
          Add Spot
        </button>
      </div>
      {showSpotForm && (
        <AddSpotForm
          createSpot={handleCreateSurfSpot}
          userId={userId}
          cities={Object.keys(cities)}
          surfSpots={surfSpots}
          setShowSpotForm={setShowSpotForm}
        />
      )}
      {selectedCity && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={() => selectCity("")}
        >
          Show Cities
        </button>
      )}
      <div className="flex flex-wrap gap-2 max-w-lg">
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
    </div>
  );
};
