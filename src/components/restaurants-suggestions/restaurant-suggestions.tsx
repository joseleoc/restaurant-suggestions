import { useStore } from "@/stores/stores";
import { useRecommendedRestaurantsFetch } from "@/src/hooks/restaurants";
import RestaurantCard from "../restaurant-card/restaurant-card";
import { styles } from "./restaurant-suggestions.style";
import Animated from "react-native-reanimated";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";

export default function RestaurantSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useStore();
  const { colors } = useTheme();
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
  // useEffect(() => {
  //   if (user != null && user.profile_completed && user.allergies != null) {
  //     console.info("Refetching restaurants");
  //     refetch();
  //   }
  // }, [refetch, user]);
  // -- END: Effects ------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.title, { color: colors.primary }]}
      >
        Restaurantes recomendados
      </Text>
      <Animated.View
        style={[styles.scrollContainer, { backgroundColor: colors.tertiary }]}
      >
        <Animated.ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {restaurants?.map((restaurant) => {
            return (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}
