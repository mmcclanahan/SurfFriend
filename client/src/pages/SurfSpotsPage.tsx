import { useState } from "react";
import { SpotCard } from "../components/SurfSpots/SpotCard";
import { CityCard } from "../components/SurfSpots/CityCard";
import { EmptySpotCard } from "../components/SurfSpots/EmptySpotCard";
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
    <div className="flex flex-col mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <div className="">
        <AddSpotForm
          createSpot={createSurfSpotMutation.mutateAsync}
          userId={userId}
          cities={Object.keys(cities)}
          surfSpots={surfSpots}
          city={selectedCity}
        />
      </div>
      <div className="flex gap-[2vw]">
        <div className="flex flex-col overflow-auto">
          <h3 className="rounded border border-[#FFE8A3] text-center text-[#FFE8A3]">
            Cities
          </h3>
          <div className="grid grid-cols-3 gap-[.5vw] overflow-auto">
            {cityList.length === 0 ? (
              <EmptySpotCard />
            ) : (
              cityList.map((city) => (
                <CityCard
                  key={city}
                  selectCity={selectCity}
                  city={city}
                  spots={cities[city]}
                  selectedCity={selectedCity}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col overflow-auto">
          <h3 className="rounded border border-[#FFE8A3] text-center text-[#FFE8A3]">
            Surf Spots
          </h3>
          <div className="grid grid-cols-2 gap-[.5vw]  overflow-auto">
            {spots.length === 0 ? (
              <EmptySpotCard />
            ) : (
              spots.map((spot: SurfSpot) => (
                <SpotCard
                  key={spot.id}
                  deleteSurfSpot={deleteSurfSpot}
                  spot={spot}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
