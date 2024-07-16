import { useState, useEffect } from "react";
import { SurfSpot } from "../../types/types";
import { useNotification } from "../../hooks/NotificationContext";
import { AddSpotFormProps } from "../../types/types";
import { doesNameExist, checkMatchingText } from "../../utils/spotFormFns";
import { Modal } from "../Modal";

export const AddSpotForm = ({
  createSpot,
  userId,
  city,
  cities,
  surfSpots,
}: AddSpotFormProps) => {
  const [selectedCity, setSelectedCity] = useState(city || "Other");
  const [newCity, setNewCity] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    setSelectedCity(city || "Other");
    setNewCity("");
  }, [city]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let city = selectedCity;
    if (city === "Other") {
      city = checkMatchingText(newCity, cities);
    } else {
      city = selectedCity;
    }

    if (
      doesNameExist(
        name,
        surfSpots
          .filter((spot) => spot.city === city)
          .map((spot) => spot.spotName)
      )
    ) {
      showNotification("Spot already exists", 0);
      return;
    }

    const checkedName = checkMatchingText(
      name,
      surfSpots
        .filter((spot) => spot.city === city)
        .map((spot) => spot.spotName)
    );
    const surfSpot: SurfSpot = {
      userId,
      spotName: checkedName,
      city: city,
    };
    createSpot(surfSpot);
    showNotification("Spot added successfully!", 1);
    setShowModal(false);
  };
  const handleSelectEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setNewCity("");
  };

  return (
    <div>
      <button
        className="border bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
        onClick={() => setShowModal(true)}
      >
        Add Spot
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-4xl">Add a Surf Spot</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-xl">
              City
            </label>
            <select value={selectedCity} onChange={handleSelectEvent}>
              {cities.map((cityOption: string) => (
                <option key={cityOption} value={cityOption}>
                  {cityOption}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {selectedCity === "Other" && (
              <input
                type="text"
                placeholder="Enter City Name Here"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                required
              />
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl">
              Name
            </label>
            <input
              required
              placeholder="Enter Surf Spot Name Here"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className="bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
            type="submit"
          >
            Add Spot
          </button>
        </form>
      </Modal>
    </div>
  );
};
