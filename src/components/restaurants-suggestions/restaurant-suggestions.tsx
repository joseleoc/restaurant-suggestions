import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useRecommendedRestaurantsFetch } from "@/src/hooks/restaurants";
import { useEffect } from "react";

export default function RestaurantSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useStore();
  const { data: restaurants, refetch } = useRecommendedRestaurantsFetch({
    allergies: user?.allergies || [],
    page_size: 10,
    page: 0,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (user != null && user.profile_completed && user.allergies != null) {
      console.info("Refetching restaurants");
      refetch();
    }
  }, [refetch, user]);

  useEffect(() => {
    if (restaurants != null) {
      console.log(restaurants.length);
    }
  }, [restaurants]);
  // -- END: Effects ------------------------------------------------------------
  return (
    <View>
      {restaurants?.map((restaurant) => {
        return <Text key={restaurant.id}>{restaurant.name}</Text>;
      })}
    </View>
  );
}
