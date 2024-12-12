import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useRecommendedRestaurantsFetch } from "@/src/hooks/restaurants";
import { useEffect } from "react";

export default function RestaurantSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useStore();
  const { mutate: fetchRecommendedRestaurants } =
    useRecommendedRestaurantsFetch();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (user != null && user.profile_completed && user.allergies != null) {
      fetchRecommendedRestaurants({
        allergies: user.allergies || [],
        page_size: 10,
        page: 1,
      });
    }
  }, [user, fetchRecommendedRestaurants]);
  // -- END: Effects ------------------------------------------------------------
  return (
    <View>
      <Text>Suggestions Slider</Text>
    </View>
  );
}
