import { QueryKeys } from "../constants/query-keys";
import { Restaurant } from "../types/general.types";
import { fetchRecommendedRestaurants } from "../services/restaurants.service";
import { useMutation } from "@tanstack/react-query";

export function useRecommendedRestaurantsFetch() {
    // --- Hooks -----------------------------------------------------------------
    const mutation = useMutation({
        mutationKey: [QueryKeys.RecommendedRestaurants],
        mutationFn: async (params: {
            allergies: string[];
            page_size: number;
            page: number;
        }): Promise<Restaurant[]> => fetchRecommendedRestaurants(params),
        retry: 0,
    });
    // --- END: Hooks ------------------------------------------------------------

    // --- Local State ------------------------------------------------------------
    // -- END: Local State --------------------------------------------------------

    // --- Data and Handlers ------------------------------------------------------
    // -- END: Data and Handlers --------------------------------------------------

    // --- Effects ----------------------------------------------------------------
    // -- END: Effects ------------------------------------------------------------
    return mutation;
}
