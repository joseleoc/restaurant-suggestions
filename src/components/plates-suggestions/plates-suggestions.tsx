import Animated from "react-native-reanimated";
import { styles } from "./plates-suggestions.styles";
import PlateCard from "../plate-card/plate-card";
import { useRecommendedPlatesFetch } from "@/src/hooks/plates";
import { useStore } from "@/stores/stores";
import { useEffect } from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";

export default function PlatesSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user } = useStore();
  const { colors } = useTheme();
  const { data: plates, error } = useRecommendedPlatesFetch({
    allergies: user?.allergies || [],
    page_size: 10,
    page: 0,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  // -- END: Effects ------------------------------------------------------------

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.title, { color: colors.primary }]}
      >
        Platos recomendados
      </Text>
      <Animated.View
        style={[styles.scrollContainer, { backgroundColor: colors.secondary }]}
      >
        <Animated.ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {plates?.map((plate) => {
            return <PlateCard plate={plate} key={plate.id} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}
