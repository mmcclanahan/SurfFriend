import { useState, useEffect, useMemo } from "react";
import { Loading } from "../components/Loading";
import { StatusForm, Session } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/NotificationContext";
import { createCityAndSpotNamesObj } from "../utils/spotFormFns";
import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { Modal } from "../components/Modal";
import { SurfSpot } from "../types/types";
import { getStatus, updateStatus } from "../Supa/queries/statusQuery";
import { getSpots, incrementSpot } from "../Supa/queries/surfSpotsQuery";
import { useUser } from "../hooks/UserContext";

export const StatusPage = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [statusId, setStatusId] = useState(null);
  const [status, setStatus] = useState(1);
  const [city, setCity] = useState("");
  const [spotName, setSpotName] = useState("");
  const [rating, setRating] = useState(3);
  //query state
  const [surfSpots, setSurfSpots] = useState<SurfSpot[]>([]);
  const [times_surfed, setTimesSurfed] = useState(0);
  const [spotId, setSpotId] = useState(0);
  const [cityAndSpotNames, setCityAndSpotNames] = useState({});
  //notification state
  const { showNotification } = useNotification();
  //modal state
  const [showModal, setShowModal] = useState(false);
  const showDiaryModal = () => setShowModal(true);
  const closeDiaryModal = () => setShowModal(false);

  //status mutation
  const handleStatusChange = (status: number) => {
    setStatus(status);
    if (status < 4 && rating !== 0) {
      setRating(0);
    }
  };
  //get status
  const getUserStatus = async (spotStatePreLoad) => {
    const { data, error } = await getStatus(userId);

    if (error) {
      showNotification("Error fetching status!", 0);
      return;
    }
    if (data[0].city === null) {
      setCity(spotStatePreLoad[0].city);
      setSpotName(spotStatePreLoad[0].spot_name);
      setSpotId(spotStatePreLoad[0].id);
      setTimesSurfed(spotStatePreLoad[0].times_surfed);
    } else {
      setCity(data[0].city);
      setSpotName(data[0].spot_name);
      const spot = spotStatePreLoad.find(
        (spot) => spot.spot_name === data[0].spot_name
      );
      if (!spot) {
        setCity(spotStatePreLoad[0].city);
        setSpotName(spotStatePreLoad[0].spot_name);
        setSpotId(spotStatePreLoad[0].id);
        setTimesSurfed(spotStatePreLoad[0].times_surfed);
      } else {
        setSpotId(spot.id);
        setTimesSurfed(spot.times_surfed);
      }
    }
    setStatusId(data[0].id);
    setStatus(data[0].status);
    setRating(data[0].rating);
  };

  //get surf spots
  const getSurfSpots = async () => {
    const { data, error } = await getSpots();
    if (error) {
      console.log("Error fetching surf spots:", error.message);
      return;
    }
    setSurfSpots(data);
    return data;
  };
  //fetch needed info for page
  const fetchData = async () => {
    await getSurfSpots().then((data) => {
      getUserStatus(data);
      const cityAndSpotNames = createCityAndSpotNamesObj(data);
      setCityAndSpotNames(cityAndSpotNames);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const statusForm: StatusForm = {
      status,
      city,
      spot_name: spotName,
      rating,
      statusId,
      times_surfed,
    };
    //error handle here
    updateStatus(statusForm);
    if (status === 4) {
      const { data, error } = await incrementSpot(spotId, times_surfed);
      if (error) {
        console.log("Error incrementing spot");
      }
      showDiaryModal();
    } else {
      //navigate("/");
      showNotification("Status Updated", 1);
    }
  };

  const selectStyle =
    "block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  //if (statusQuery.isLoading || surfSpotsQuery.isLoading) return <Loading />;

  return (
    <div className="flex justify-center mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <Modal show={showModal} onClose={closeDiaryModal}>
        <DiaryEntryForm
          city={city}
          spotName={spotName}
          rating={rating}
          closeDiaryModal={closeDiaryModal}
          userId={userId}
        />
      </Modal>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-5xl text-[#FFE8A3]">Update Status</h1>
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
              setSpotName(cityAndSpotNames[e.target.value][0].spot_name);
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
            onChange={(e) => {
              e.preventDefault();
              setSpotName(e.target.value);
              setSpotId(Number(e.target.selectedOptions[0].id));
            }}
            disabled={status === 1}
          >
            {cityAndSpotNames[city]?.map((spot) => (
              <option key={spot.id} value={spot.spot_name} id={spot.id}>
                {spot.spot_name}
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
                id="rating"
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
