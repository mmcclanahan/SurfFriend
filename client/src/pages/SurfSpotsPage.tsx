import { useState } from "react";
import { SpotCard } from "../components/SurfSpots/SpotCard";
import { CityCard } from "../components/SurfSpots/CityCard";
import { EmptyCard } from "../components/SurfSpots/EmptyCard";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { SurfSpot } from "../types/types";
import { Loading } from "../components/Loading";
import { AddSpotForm } from "../components/SurfSpots/AddSpotForm";

export const SurfSpotsPage = ({ userId }: { userId: number }) => {
  const { surfSpotsQuery, handleCreateSurfSpot, handleDeleteSurfSpot } =
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
    <div className="flex flex-col justify-between bg-myGray rounded shadow-white shadow-md p-5 mt-20 h-full w-full max-w-xl max-h-xl">
      <h3 className="text-myBlack text-4xl self-center">
        {selectedCity !== "Other" ? `${selectedCity}` : "Your Surf Spots"}
      </h3>
      <div className="flex justify-between">
        {selectedCity !== "Other" && (
          <button
            className="border bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded"
            onClick={() => selectCity("Other")}
          >
            Show Cities
          </button>
        )}
        <AddSpotForm
          createSpot={handleCreateSurfSpot}
          userId={userId}
          cities={Object.keys(cities)}
          surfSpots={surfSpots}
          city={selectedCity}
        />
      </div>
      <div className="self-center border border-myBlack bg-myBlack rounded flex flex-wrap overflow-auto justify-center items-center gap-2 p-2 mt-1">
        {selectedCity !== "Other" ? (
          spots.map((spot: SurfSpot) => (
            <SpotCard
              key={spot.id}
              deleteSurfSpot={deleteSurfSpot}
              spot={spot}
            />
          ))
        ) : cityList.length === 0 ? (
          <EmptyCard />
        ) : (
          cityList.map((city) => (
            <CityCard
              key={city}
              selectCity={selectCity}
              city={city}
              spots={cities[city]}
            />
          ))
        )}
      </div>
    </div>
  );
};
