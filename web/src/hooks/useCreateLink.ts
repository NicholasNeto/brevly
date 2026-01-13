import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../services/api";
import type { LinkItemType } from "../types/linksTypes";

type CreateLinkDTO = {
  originalUrl: string;
  shortUrl: string;
};

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkDTO) =>
        apiFetch<LinkItemType>("/links", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });
}
