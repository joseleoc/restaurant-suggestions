import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../constants/query-keys";
import { fetchRecommendedPlates } from "../services/plates.service";

export function useRecommendedPlatesFetch(params: {
  allergies: string[];
  page_size: number;
  page: number;
}) {
  // --- Hooks -----------------------------------------------------------------
  const query = useQuery({
    queryKey: [QueryKeys.RecommendedPlates],
    queryFn: () => fetchRecommendedPlates(params),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: params.allergies != null,
  });
  // --- END: Hooks ------------------------------------------------------------

  return query;
}
