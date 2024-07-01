import { useState } from "react";
import { SurfSpot } from "../../types/types";
import { useNotification } from "../NotificationHeader";
import { AddSpotFormProps } from "../../types/types";
import { doesNameExist, checkMatchingText } from "../../utils/spotFormFns";

export const AddSpotForm = ({
  createSpot,
  userId,
  city,
  cities,
  surfSpots,
  setShowSpotForm,
}: AddSpotFormProps) => {
  const { showNotification, Notification } = useNotification();
  const [selectedCity, setSelectedCity] = useState(city || "Other");
  const [newCity, setNewCity] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //check if city exists already
    let city = selectedCity;
    if (city === "Other") {
      city = checkMatchingText(newCity, cities);
    } else {
      city = selectedCity;
    }
    //check if name exists alredy exists
    if (
      doesNameExist(
        name,
        surfSpots.filter((spot) => spot.city === city).map((spot) => spot.name)
      )
    ) {
      showNotification("Spot already exists", "red");
      return;
    }
    const checkedName = checkMatchingText(
      name,
      surfSpots.filter((spot) => spot.city === city).map((spot) => spot.name)
    );
    const surfSpot: SurfSpot = {
      userId,
      name: checkedName,
      city: city,
    };
    createSpot(surfSpot);
    showNotification("Spot added successfully!", "green");
  };

  return (
    <div className="addSpotForm">
      <Notification />
      <h2>Add a Surf Spot</h2>
      <form onSubmit={handleSubmit}>
        <div className="formDivs">
          <label htmlFor="city" className="formLabels">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((cityOption: string) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {
            <input
              required
              type="text"
              value={newCity}
              disabled={selectedCity !== "Other"}
              onChange={(e) => setNewCity(e.target.value)}
            />
          }
        </div>
        <div className="formDivs">
          <label htmlFor="name" className="formLabels">
            Name
          </label>
          <input
            required
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add Spot</button>
        <button
          type="button"
          onClick={() => {
            setShowSpotForm(false);
          }}
        >
          back
        </button>
      </form>
    </div>
  );
};
