import { supabase } from "../connect.js";
import { SurfSpot } from "../../types/types.js";

export const getSpots = async () => {
  const response = await supabase.from("SurfSpots").select();
  return response;
};

export const addSpot = async (surfSpot: SurfSpot) => {
  const response = await supabase.from("SurfSpots").insert(surfSpot).select();
  return response;
};

export const deleteSpot = async (spotId: number) => {
  const response = await supabase.from("SurfSpots").delete().eq("id", spotId);
  return response;
};
//need times surfed
export const incrementSpot = async (spotId: number, times_surfed: number) => {
  console.log(spotId, times_surfed, "here");
  const amt = times_surfed + 1;
  const response = await supabase
    .from("SurfSpots")
    .update({ times_surfed: amt })
    .eq("id", spotId);
  return response;
};
