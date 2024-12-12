import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../constants/query-keys";
import { useStore } from "@/stores/stores";
import { Allergy } from "../types/general.types";
import { fetchAllergies } from "../services/allergies.service";
import { useEffect } from "react";

export function useAllAllergiesFetch() {
    // --- Hooks -----------------------------------------------------------------
    const { user, setPendingAllergies, setAllergies } = useStore();

    const query = useQuery({
        queryKey: [QueryKeys.allergies],
        queryFn: async (): Promise<Allergy[]> => {
            return new Promise((resolve) => {
                setPendingAllergies(true);
                fetchAllergies().then((allergies) => {
                    setAllergies(allergies);
                    resolve(allergies);
                    setPendingAllergies(false);
        });
      });
      },
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      enabled: !!user,
  });
    // --- END: Hooks ------------------------------------------------------------

    // --- Effects ----------------------------------------------------------------
    useEffect(() => {
        if (user != null && user.profile_completed && user.allergies != null) {
            query.refetch();
        }
    }, [query, user]);
    // -- END: Effects ------------------------------------------------------------

    return query;
}
