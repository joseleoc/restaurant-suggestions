import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { useStore } from "@/stores/stores";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantDetails from "@/src/components/restaurant-details/restaurant-details";
import BackButton from "@/src/components/back-button/back-button";

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { recommendedRestaurants } = useStore();
  const restaurant = useMemo(
    () => recommendedRestaurants.find((r) => r.id === id),
    [recommendedRestaurants, id],
  );

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantDetails restaurant={restaurant} />
      <BackButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
