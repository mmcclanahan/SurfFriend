import { useState, useEffect } from "react";
import { SurfSpot } from "../../types/types";
import { useNotification } from "../../hooks/NotificationContext";
import { AddSpotFormProps } from "../../types/types";
import { doesNameExist, checkMatchingText } from "../../utils/spotFormFns";
import { Modal } from "../Modal";
import { addSpot } from "../../Supa/queries/surfSpotsQuery";
import { useUser } from "../../hooks/UserContext";

export const AddSpotForm = ({ city, cities, surfSpots }: AddSpotFormProps) => {
  const [selectedCity, setSelectedCity] = useState(city || "Other");
  const [newCity, setNewCity] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { showNotification } = useNotification();
  const { userId } = useUser();

  useEffect(() => {
    setSelectedCity(city || "Other");
    setNewCity("");
  }, [city]);

  //can I input two of the same city names?
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
          .map((spot) => spot.spot_name)
      )
    ) {
      showNotification("Spot already exists", 0);
      return;
    }
    const checkedName = checkMatchingText(
      name,
      surfSpots
        .filter((spot) => spot.city === city)
        .map((spot) => spot.spot_name)
    );
    const surfSpot: SurfSpot = {
      spot_name: checkedName,
      city: city,
      user_id: userId,
    };
    const { data, error } = await addSpot(surfSpot);
    if (error) {
      showNotification(
        error.message || "City doesn't exist! Is there another name?",
        0
      );
    } else {
      showNotification("Spot added successfully!", 1);
    }
    //re get spots
    setShowModal(false);
  };

  const handleSelectEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setNewCity("");
  };

  return (
    <div>
      <button
        className="bg-[#D86B6B] hover:bg-[#D86B6B] text-black py-2 px-4 rounded"
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
