import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSurfSpots,
  createSurfSpot,
  incrementSurfSpot,
} from "../API/surfSpots";
import { SurfSpot } from "../types/types";

export const useSurfSpots = (userId: number) => {
  const queryClient = useQueryClient();

  const surfSpotsQuery = useQuery({
    queryKey: ["surfSpots"],
    queryFn: () => getAllSurfSpots(userId),
  });

  const createSurfSpotMutation = useMutation({
    mutationFn: (surfSpot: SurfSpot) => createSurfSpot(surfSpot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surfSpots"] });
    },
  });

  const incrementSurfSpotMutation = useMutation({
    mutationFn: (id: number) => incrementSurfSpot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surfSpots"] });
    },
  });

  const handleCreateSurfSpot = (surfSpot: SurfSpot) => {
    createSurfSpotMutation.mutate(surfSpot);
  };

  const handleIncrementSurfSpot = (id: number) => {
    incrementSurfSpotMutation.mutate(id);
  };

  return {
    surfSpotsQuery,
    createSurfSpotMutation,
    incrementSurfSpotMutation,
    handleCreateSurfSpot,
    handleIncrementSurfSpot,
  };
};
