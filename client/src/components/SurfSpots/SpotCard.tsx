import { SurfSpot } from "../../types/types";

export const SpotCard = ({
  spot,
  deleteSurfSpot,
}: {
  spot: SurfSpot;
  deleteSurfSpot: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center border rounded shadow-md bg-myGray p-5">
      <h4 className="font-semibold">{spot.spotName}</h4>
      <button
        className="border bg-myRed hover:bg-myRedHover text-myBlack py-2 px-4 rounded"
        onClick={() => {
          deleteSurfSpot(spot.id);
        }}
      >
        Delete
      </button>
      <p>Times Surfed: {spot.timesSurfed}</p>
    </div>
  );
};
