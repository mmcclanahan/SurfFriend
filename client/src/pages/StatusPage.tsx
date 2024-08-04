import { useState, useEffect, useMemo } from "react";
import { Loading } from "../components/Loading";
import { StatusForm, Session } from "../types/types";
import { createSession } from "../API/sessions";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import { useSurfSpots } from "../hooks/useSurfSpots";
import { useNotification } from "../hooks/NotificationContext";
import { createCityAndSpotNamesObj } from "../utils/spotFormFns";
import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { Modal } from "../components/Modal";

export const StatusPage = ({ userId }: { userId: number }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(1);
  const [city, setCity] = useState("");
  const [spotName, setSpotName] = useState("");
  const [rating, setRating] = useState(3);

  const [diary, setDiary] = useState("");
  const { surfSpotsQuery } = useSurfSpots(userId);
  const { statusQuery, updateStatusMutation } = useUserStatus(userId);
  //notification state
  const { showNotification } = useNotification();
  //modal state
  const [showModal, setShowModal] = useState(false);
  const showDiaryModal = () => setShowModal(true);
  const closeDiaryModal = () => setShowModal(false);

  const surfSpots = surfSpotsQuery.data || [];

  const cityAndSpotNames = useMemo(() => {
    return createCityAndSpotNamesObj(surfSpots);
  }, [surfSpots]);

  const addSession = () => {
    const session: Session = {
      city,
      spotName,
      rating,
      diary,
    };
    createSession(userId, session);
    //add navigate and notification
  };

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
      showDiaryModal();
    } else {
      navigate("/");
      showNotification("Status Updated", 1);
    }
  };

  const handleStatusChange = (status: number) => {
    setStatus(status);
    if (status < 4 && rating !== 0) {
      setRating(0);
    }
  };

  const selectStyle =
    "block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  if (statusQuery.isLoading || surfSpotsQuery.isLoading) return <Loading />;

  return (
    <div className="flex bg-black justify-center mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <Modal show={showModal} onClose={closeDiaryModal}>
        <DiaryEntryForm
          setDiary={setDiary}
          closeDiaryModal={closeDiaryModal}
          addSession={addSession}
        />
      </Modal>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-5xl text-[#FFE8A3]">Update Status for Friends</h1>
        <div className="mt-4">
          <label htmlFor="status" className="text-xl text-[#FFE8A3]">
            Status
          </label>
          <select
            id="status"
            className={selectStyle}
            value={status}
            onChange={(e) => {
              handleStatusChange(Number(e.target.value));
            }}
          >
            <option value={1}>Not Surfing</option>
            <option value={2}>Checking</option>
            <option value={3}>Paddling out</option>
            <option value={4}>Done Surfing</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="city" className="text-xl text-[#FFE8A3]">
            City
          </label>
          <select
            id="city"
            className={selectStyle}
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
        <div className="mt-4">
          <label htmlFor="spotName" className="mt-2 text-xl text-[#FFE8A3]">
            Spot Name
          </label>
          <select
            className={selectStyle}
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
        <div className="mt-4">
          <label htmlFor="rating" className="mt-2 text-xl text-[#FFE8A3]">
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
          className="mt-4 border bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-myYellow focus:ring-opacity-50"
          type="submit"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};
