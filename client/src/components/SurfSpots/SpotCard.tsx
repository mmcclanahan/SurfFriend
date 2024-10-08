import { SurfSpot } from "../../types/types";

export const SpotCard = ({
  spot,
  deleteSurfSpot,
}: {
  spot: SurfSpot;
  deleteSurfSpot: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col rounded-3xl border border-[#FFE8A3] p-3 w-full min-w-[33%]">
      <div className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className=" hover:fill-myRedHover fill-myRed cursor-pointer"
          onClick={() => {
            deleteSurfSpot(spot.id);
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z" />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="font-semibold text-[#FFE8A3]">{spot.spot_name}</h4>
        <p className="text-[#FFE8A3]">Times Surfed: {spot.times_surfed}</p>
      </div>
    </div>
  );
};
