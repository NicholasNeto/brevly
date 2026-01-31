import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../services/api";


type DeleteLinkParams = {
  id: string;
};

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteLinkParams) => {
      return apiFetch(`/links/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });
}
