import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { LinkItemType } from "../types/linksTypes";
import { apiFetch } from "../services/api";

export type CreateLinkDTO = {
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
