import { supabase } from "../connect.js";
import { SurfSpot } from "../../types/types.js";

export const getSpots = async () => {
  const response = await supabase.from("SurfSpots").select();
  return response;
};

export const addSpot = async (surfSpot: SurfSpot) => {
  const { data, error } = await supabase
    .from("SurfSpots")
    .insert(surfSpot)
    .select();

  if (error) {
    console.error("Error adding surf spot:", error.message);
    return error;
  }

  return { data, error };
};

export const deleteSpot = async (spotId: number) => {
  const response = await supabase.from("SurfSpots").delete().eq("id", spotId);
  return response;
};

export const incrementSpot = async (spotId: number, times_surfed: number) => {
  const response = await supabase
    .from("SurfSpots")
    .update({ count: times_surfed + 1 })
    .eq("id", spotId);

  return response;
};
