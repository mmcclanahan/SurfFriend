import { useEffect, useState } from "react";
import { SurfSpot } from "../types/types";
import { SpotCard } from "../components/SurfSpots/SpotCard";
import { CityCard } from "../components/SurfSpots/CityCard";
import { EmptySpotCard } from "../components/SurfSpots/EmptySpotCard";
import { AddSpotForm } from "../components/SurfSpots/AddSpotForm";
import { getSpots, deleteSpot } from "../Supa/queries/surfSpotsQuery";
import { useNotification } from "../hooks/NotificationContext";

export const SurfSpotsPage = () => {
  const [surfSpots, setSurfSpots] = useState<SurfSpot[]>([]);
  const [selectedCity, setSelectedCity] = useState("Other");
  const { showNotification } = useNotification();

  const fetchSpots = async () => {
    const { data, error } = await getSpots();

    if (error) {
      console.log("Error fetching surf spots:", error.message);
      return;
    }
    setSurfSpots(data);

    if (data.length > 0) {
      setSelectedCity(data[0].city);
    } else {
      setSelectedCity("Other");
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

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

  const deleteSurfSpot = async (id: number) => {
    const { data, error } = await deleteSpot(id);
    if (error) {
      showNotification("Error deleting surf spot", 0, 2000);
      return;
    }
    // re configure the state of the surf spots without the deleted spot
    const newSpots = surfSpots.filter((spot) => spot.id !== id);
    setSurfSpots(newSpots);

    if (spots.length === 1) {
      setSelectedCity("Other");
    }
  };

  return (
    <div className="slide-in flex flex-col mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <div className="">
        <AddSpotForm
          cities={Object.keys(cities)}
          surfSpots={surfSpots}
          city={selectedCity}
        />
      </div>
      <div className="justify-center max-h-[90%] flex gap-[2vw] mt-4">
        <div className="slide-up flex flex-col overflow-auto w-11/12">
          <h3 className="rounded border border-[#FFE8A3] text-center text-[#FFE8A3] w-full">
            Cities
          </h3>
          <div className="grid grid-cols-3 gap-[.5vw] overflow-auto mt-2">
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
        <div className="slide-up flex flex-col overflow-auto w-11/12">
          <h3 className="rounded border border-[#FFE8A3] text-center text-[#FFE8A3] w-full">
            Surf Spots
          </h3>
          <div className="grid grid-cols-3 gap-[.5vw]  overflow-auto mt-2 no-scrollbar">
            {spots.length === 0 ? (
              <EmptySpotCard />
            ) : (
              spots.map((spot: SurfSpot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  deleteSurfSpot={deleteSurfSpot}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
