import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatus, updateStatus } from "../API/status";
import { StatusForm } from "../types/types";
export const useUserStatus = (userId: number) => {
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: ["status"],
    queryFn: () => getStatus(userId),
  });
  const updateStatusMutation = useMutation({
    mutationFn: (statusForm: StatusForm) => updateStatus(userId, statusForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  return {
    statusQuery,
    updateStatusMutation,
  };
};
