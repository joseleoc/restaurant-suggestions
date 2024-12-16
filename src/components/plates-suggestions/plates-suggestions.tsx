import Animated from "react-native-reanimated";
import { styles } from "./plates-suggestions.styles";
import PlateCard from "../plate-card/plate-card";
import { useStore } from "@/stores/stores";
import { useEffect, useMemo, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { QueryKeys } from "@/src/constants/query-keys";
import { fetchRecommendedPlates } from "@/src/services/plates.service";
import { toast } from "@backpackapp-io/react-native-toast";

export default function PlatesSuggestions() {
  // --- Local State -----------------------------------------------------------------
  const [firstRender, setFirstRender] = useState(true);
  const [loading, setLoading] = useState(false);

  // --- END: Local State ------------------------------------------------------------
  // --- Hooks -----------------------------------------------------------------
  const { user, allergies, plates, setPlates, resetPlates } = useStore();
  const allergiesToInclude = useMemo(() => {
    const userAllergies = user?.allergies || [];
    const activeAllergies = allergies || [];

    const toInclude = activeAllergies
      .filter((al) => (userAllergies.some((id) => id === al.id) ? false : true))
      .map((al) => al.id);

    const toIncludeNames = toInclude.map(
      (id) => allergies.find((al) => al.id === id)?.name,
    );
    console.log({ toIncludeNames });

    return toInclude;
  }, [user, allergies]);
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------
  // --- Data and Handlers ------------------------------------------------------
  const fetchPlates = async () => {
    console.log({ allergiesToIncludeL: allergiesToInclude.length });
    setLoading(true);
    fetchRecommendedPlates({
      queryKey: [
        QueryKeys.RecommendedPlates,
        {
          allergiesToInclude,
          page_size: 10,
          page: 0,
        },
      ],
    })
      .then((resPlates) => {
        resetPlates();

        const platesToInclude = resPlates.filter((plate) => {
          const userAllergies = user?.allergies || [];
          const notToInclude = userAllergies.some((id) =>
            plate.allergies.includes(id),
          );
          return !notToInclude;
        });

        console.log({ platesToInclude: platesToInclude.map((p) => p.name) });

        setPlates(platesToInclude);
        console.log(plates.map((p) => p.name));
      })
      .catch(() => {
        toast.error("Hubo un error al cargar los platos");
      })
      .finally(() => setLoading(false));
  };
  // --- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }

    if (firstRender) {
      fetchPlates();
    }
  }, [setFirstRender, fetchPlates]);
  useEffect(() => {
    if (
      user != null &&
      user.profile_completed &&
      user.allergies != null &&
      !firstRender
    ) {
      console.log("calling plates from user effect");
      fetchPlates();
    }
  }, [user, allergiesToInclude]);

  // useEffect(() => {
  //   if (data) {
  //     resetPlates();
  //     setPlates(data);
  //     console.log({ length: data.length, platesName: data.map((p) => p.name) });
  //   }
  // }, [data, resetPlates, setPlates]);

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
          {plates.length === 0 && loading === false && (
            <Text>No hay platos disponibles</Text>
          )}

          {plates?.map((plate) => {
            return <PlateCard plate={plate} key={plate.id} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}
