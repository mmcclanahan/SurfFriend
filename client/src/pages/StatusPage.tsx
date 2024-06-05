import { StatusForm } from "../types/types";
import { useState } from "react";
import "../styles/statusPage.css";

export const StatusPage = () => {
  const [status, setStatus] = useState("1");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("0");
  // need to set all of these based of current state of user

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const statusForm: StatusForm = {
      status: status,
      location: location,
      rating: rating,
    };
    console.log(statusForm);
  };

  return (
    <div className="statusPage">
      <h1>Update Status</h1>
      <form className="statusForm" onSubmit={handleSubmit}>
        <div className="formDivs">
          <label htmlFor="status" className="formLabels">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="1">Not Surfing</option>
            <option value="2">Checking the spot</option>
            <option value="3">Jumping in water</option>
            <option value="4">Done Surfing</option>
          </select>
        </div>
        <div className="formDivs">
          <label htmlFor="location" className="formLabels">
            Surf Spot
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={status === "1"}
          />
        </div>
        <div className="formDivs">
          <label htmlFor="rating" className="formLabels">
            Rating
          </label>
          <div className="btnDivs">
            {["1", "2", "3", "4", "5"].map((value) => (
              <button
                key={value}
                type="button"
                className={rating === value ? "selectedBtn" : ""}
                onClick={() => setRating(value)}
                disabled={status !== "4"}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
