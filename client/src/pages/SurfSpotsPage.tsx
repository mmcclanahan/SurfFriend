import { useState } from "react";
import { SpotCard } from "../components/SurfSpots/SpotCard";
import { CityCard } from "../components/SurfSpots/CityCard";
import { EmptyCard } from "../components/SurfSpots/EmptyCard";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { SurfSpot } from "../types/types";
import { Loading } from "../components/Loading";
import { AddSpotForm } from "../components/SurfSpots/AddSpotForm";

export const SurfSpotsPage = ({ userId }: { userId: number }) => {
  const { surfSpotsQuery, createSurfSpotMutation, handleDeleteSurfSpot } =
    useSurfSpots(userId);
  const [selectedCity, setSelectedCity] = useState("Other");

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

  const cityList = Object.keys(cities);

  const spots = surfSpots.filter(
    (spot: SurfSpot) => spot.city === selectedCity
  );

  const selectCity = (city: string) => {
    setSelectedCity(city);
  };

  const deleteSurfSpot = (id: number) => {
    handleDeleteSurfSpot(id);
    if (spots.length === 1) {
      setSelectedCity("Other");
    }
  };

  return (
    <div className="flex flex-col mt-20">
      <AddSpotForm
        createSpot={createSurfSpotMutation.mutateAsync}
        userId={userId}
        cities={Object.keys(cities)}
        surfSpots={surfSpots}
        city={selectedCity}
      />
      <div className="flex h-full overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-2 overflow-auto">
          {cityList.map((city) => (
            <CityCard
              key={city}
              selectCity={selectCity}
              city={city}
              spots={cities[city]}
              selectedCity={selectedCity}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 p-2 overflow-auto">
          {spots.map((spot: SurfSpot) => (
            <SpotCard
              key={spot.id}
              deleteSurfSpot={deleteSurfSpot}
              spot={spot}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
