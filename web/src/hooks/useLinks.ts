import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../services/api"
import type { LinkItemType } from "../types/linksTypes"


export function useLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: () => apiFetch<LinkItemType[]>("/links"),
  })
}
