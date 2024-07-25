import { SurfSpot } from "../../types/types";

export const SpotCard = ({
  spot,
  deleteSurfSpot,
}: {
  spot: SurfSpot;
  deleteSurfSpot: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center rounded-3xl shadow-md bg-[#1A4F5C] p-5 h-[15vh]">
      <h4 className="font-semibold text-[#FFE8A3]">{spot.spotName}</h4>
      <button
        className="bg-myRed hover:bg-myRedHover text-myBlack py-2 px-4 rounded"
        onClick={() => {
          deleteSurfSpot(spot.id);
        }}
      >
        Delete
      </button>
      <p className="text-[#FFE8A3]">Times Surfed: {spot.timesSurfed}</p>
    </div>
  );
};
