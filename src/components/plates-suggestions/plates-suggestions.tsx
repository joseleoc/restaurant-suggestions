import Animated from "react-native-reanimated";
import { styles } from "./plates-suggestions.styles";
import PlateCard from "../plate-card/plate-card";
import { useStore } from "@/stores/stores";
import { useEffect, useMemo, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/src/constants/query-keys";
import { fetchRecommendedPlates } from "@/src/services/plates.service";
import { Plate } from "@/src/types/general.types";

export default function PlatesSuggestions() {
  // --- Hooks -----------------------------------------------------------------
  const { user, allergies, plates, setPlates } = useStore();
  const allergiesToInclude = useMemo(() => {
    const userAllergies = user?.allergies || [];
    const activeAllergies = allergies || [];

    const toInclude = activeAllergies
      .filter((al) => (userAllergies.some((id) => id === al.id) ? false : true))
      .map((al) => al.id);
    return toInclude;
  }, [user, allergies]);
  const { colors } = useTheme();
  const { data, error, refetch, status } = useQuery({
    queryKey: [
      QueryKeys.RecommendedPlates,
      {
        allergiesToInclude,
        page_size: 10,
        page: 0,
      },
    ],
    queryFn: fetchRecommendedPlates,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: true,
  });
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State -----------------------------------------------------------------

  // --- END: Local State ------------------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (user != null && user.profile_completed && user.allergies != null) {
      refetch();
    }
  }, [refetch, user, allergiesToInclude]);

  useEffect(() => {
    if (data) {
      setPlates(data);
    }
  }, [data, setPlates, status]);

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
