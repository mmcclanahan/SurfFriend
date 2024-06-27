import { SurfSpot } from "../../types/types";

export const SpotCard = ({ spot }: { spot: SurfSpot }) => {
  return (
    <div className="spot-card">
      <h4>{spot.name}</h4>
      <p>Times Surfed: {spot.timesSurfed}</p>
    </div>
  );
};
