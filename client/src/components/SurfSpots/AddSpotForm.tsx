import { useState } from "react";
import { SurfSpot } from "../../types/types";

export const AddSpotForm = ({
  createSpot,
  userId,
  city,
  cities,
  surfSpots,
}: {
  createSpot: (surfSpot: SurfSpot) => void;
  userId: number;
  city?: string;
  cities: string[];
  surfSpots: SurfSpot[];
}) => {
  const [selectedCity, setSelectedCity] = useState(city || "");
  const [textCity, setTextCity] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let city = selectedCity;
    if (city === "Other") {
      city = checkMatchingText(textCity, cities);
    } else {
      city = selectedCity;
    }
    const checkedName = checkMatchingText(
      name,
      surfSpots.map((spot: SurfSpot) => spot.name)
    );
    if (checkedName === name) {
      console.log("Spot name already exists");
      return;
    }
    const surfSpot: SurfSpot = {
      userId,
      name: checkedName,
      city: city,
    };
    createSpot(surfSpot);
  };

  const checkMatchingText = (text: string, list: string[]) => {
    const lowerCaseNoSpaceText = text.toLowerCase().replace(/\s+/g, "");
    const matchingListString = list.find(
      (cityOption: string) =>
        cityOption.toLowerCase().replace(/\s+/g, "") === lowerCaseNoSpaceText
    );
    if (matchingListString) {
      return matchingListString;
    }
    return text;
  };

  return (
    <div className="add-spot-form">
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
              value={textCity}
              disabled={selectedCity !== "Other"}
              onChange={(e) => setTextCity(e.target.value)}
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
      </form>
    </div>
  );
};
