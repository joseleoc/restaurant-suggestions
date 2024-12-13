import { QueryKeys } from "../constants/query-keys";
import { fetchRecommendedRestaurants } from "../services/restaurants.service";
import { useQuery } from "@tanstack/react-query";

export function useRecommendedRestaurantsFetch(params: {
  allergies: string[];
  page_size: number;
  page: number;
}) {
  // --- Hooks -----------------------------------------------------------------
  const query = useQuery({
    queryKey: [QueryKeys.RecommendedRestaurants, params],
    queryFn: () => fetchRecommendedRestaurants(params),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: params.allergies != null,
  });

  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  // -- END: Effects ------------------------------------------------------------
  return query;
}
