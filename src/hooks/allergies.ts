import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../constants/query-keys";
import { useStore } from "@/stores/stores";
import { Allergy } from "../types/general.types";

export function useAllAllergiesFetch() {
    // --- Hooks -----------------------------------------------------------------
    const { user, setPendingAllergies, setAllergies, allergies } = useStore();

    const query = useQuery({
        queryKey: [QueryKeys.allergies],
        queryFn: async (): Promise<Allergy[]> => {
            return new Promise((resolve) => {
                setPendingAllergies(true);
                setTimeout(() => {
                    const allergies: Allergy[] = [
                        {
                            id: "1",
                            name: "Pollo",
                            foods: ["Pollo", "Pescado"],
                            description: "Esto es un pollo",
                            type: "peligro",
                        },
                        {
                            id: "2",
                            name: "Cereal",
                            foods: ["Cereal", "Frutas"],
                            description: "Esto es un cereal",
                            type: "peligro",
                        },
                        {
                            id: "3",
                            name: "Frutas",
                            foods: ["Frutas", "Cereal"],
                            description: "Esto es una fruta",
                            type: "peligro",
                        },
                        {
                            id: "4",
                            name: "Pollo",
                            foods: ["Pollo", "Pescado"],
                            description: "Esto es un pollo",
                            type: "peligro",
                        },
                    ];
                    setAllergies(allergies);
                    resolve(allergies);
                    setPendingAllergies(false);
                }, 3000);
            });
        },
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        enabled: !!user,
    });
    // --- END: Hooks ------------------------------------------------------------

    return query;
}
