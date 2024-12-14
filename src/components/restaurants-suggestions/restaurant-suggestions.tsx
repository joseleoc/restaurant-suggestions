import { useStore } from "@/stores/stores";
import RestaurantCard from "../restaurant-card/restaurant-card";
import { styles } from "./restaurant-suggestions.style";
import Animated from "react-native-reanimated";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/src/constants/query-keys";
import { fetchRecommendedRestaurants } from "@/src/services/restaurants.service";

export default function RestaurantSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user, allergies, setRecommendedRestaurants, recommendedRestaurants } =
    useStore();
  const allergiesToInclude = useMemo(() => {
    const userAllergies = user?.allergies || [];
    const activeAllergies = allergies || [];
    const toInclude = activeAllergies
      .filter((al) => (userAllergies.some((id) => id === al.id) ? false : true))
      .map((al) => al.id);
    return toInclude;
  }, [user, allergies]);
  const { colors } = useTheme();
  const { data, refetch } = useQuery({
    queryKey: [
      QueryKeys.RecommendedRestaurants,
      { allergiesToInclude, page_size: 10, page: 0 },
    ],
    queryFn: fetchRecommendedRestaurants,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: true,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (user != null && user.profile_completed && user.allergies != null) {
      refetch();
    }
  }, [user, allergiesToInclude, refetch]);

  useEffect(() => {
    if (data) {
      setRecommendedRestaurants(data);
    }
  }, [data, setRecommendedRestaurants]);
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
        style={[styles.scrollContainer, { backgroundColor: colors.secondary }]}
      >
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {recommendedRestaurants?.map((restaurant) => {
            return (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}
