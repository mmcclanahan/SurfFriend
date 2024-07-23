import { useState, useEffect, useMemo } from "react";
import { Loading } from "../components/Loading";
import { StatusForm, Session } from "../types/types";
import { createSession } from "../API/sessions";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { useNotification } from "../hooks/NotificationContext";
import { createCityAndSpotNamesObj } from "../utils/spotFormFns";

export const StatusPage = ({ userId }: { userId: number }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(1);
  const [city, setCity] = useState("");
  const [spotName, setSpotName] = useState("");
  const [rating, setRating] = useState(3);
  const { surfSpotsQuery } = useSurfSpots(userId);
  const { statusQuery, updateStatusMutation } = useUserStatus(userId);
  const { showNotification } = useNotification();

  const surfSpots = surfSpotsQuery.data || [];

  const cityAndSpotNames = useMemo(() => {
    return createCityAndSpotNamesObj(surfSpots);
  }, [surfSpots]);

  useEffect(() => {
    if (statusQuery.data && surfSpotsQuery.data) {
      const defaultCity =
        surfSpotsQuery.data.length > 0 ? surfSpotsQuery.data[0].city : "";
      const defaultSpotName =
        surfSpotsQuery.data.length > 0 ? surfSpotsQuery.data[0].spotName : "";
      if (statusQuery.data.city === "") {
        setCity(defaultCity);
        setSpotName(defaultSpotName);
      } else {
        setStatus(statusQuery.data.status);
        setCity(statusQuery.data.city);
        setSpotName(statusQuery.data.spotName);
        setRating(statusQuery.data.rating);
      }
    }
  }, [statusQuery.data, surfSpotsQuery.data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const statusForm: StatusForm = {
      status,
      city,
      spotName,
      rating,
    };
    updateStatusMutation.mutate(statusForm);
    if (status === 4) {
      const session: Session = {
        city,
        spotName,
        rating,
      };
      createSession(userId, session);
    }
    navigate("/");
    showNotification("Status Updated", 1);
  };

  const handleStatusChange = (status: number) => {
    setStatus(status);
    if (status < 4 && rating !== 0) {
      setRating(0);
    }
  };

  if (statusQuery.isLoading || surfSpotsQuery.isLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-between bg-myGray rounded shadow-white shadow-md p-5 mt-20 h-full w-full max-w-xl max-h-xl">
      <form className="statusForm" onSubmit={handleSubmit}>
        <h1 className="text-5xl">Update Status</h1>
        <div className="flex flex-col">
          <label htmlFor="status" className="text-xl">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              handleStatusChange(Number(e.target.value));
            }}
          >
            <option value={1}>Not Surfing</option>
            <option value={2}>Checking the spot</option>
            <option value={3}>Jumping in water</option>
            <option value={4}>Done Surfing</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-xl">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setSpotName(cityAndSpotNames[e.target.value][0]);
            }}
            disabled={status === 1}
          >
            {Object.keys(cityAndSpotNames).map((cityOption: string) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="spotName" className="text-xl">
            Spot Name
          </label>
          <select
            id="spotName"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            disabled={status === 1}
          >
            {cityAndSpotNames[city]?.map((spot) => (
              <option key={spot} value={spot}>
                {spot}
              </option>
            ))}
          </select>
        </div>
        <div className="formDivs">
          <label htmlFor="rating" className="text-xl">
            Rating
          </label>
          <div className="flex gap-20">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                  rating === value
                    ? "bg-myGreen text-myBlack"
                    : "bg-myGray text-white"
                } hover:bg-myGreenHover hover:text-myBlack`}
                onClick={() => {
                  setRating(value);
                }}
                disabled={status !== 4}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button
          className="border bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
