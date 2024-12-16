import { Plate } from "@/src/types/general.types";
import { Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View } from "react-native";
import { ActivityIndicator, FAB, Text, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { fetchPlateById, placeOrder } from "@/src/services/plates.service";
import { useStore } from "@/stores/stores";
import { toast } from "@backpackapp-io/react-native-toast";
import { useEffect, useState } from "react";

export default function PlateDetails(params: { plateId: string | undefined }) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { user, recommendedRestaurants } = useStore();
  // --- END: Hooks ------------------------------------------------------------
  // --- Local State ------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [plate, setPlate] = useState<Plate | undefined>();
  // -- END: Local State --------------------------------------------------------
  // --- Data and Handlers ------------------------------------------------------

  const handlePlaceOrder = () => {
    const restaurantId = plate?.restaurant;
    const restaurant = recommendedRestaurants.find(
      (r) => r.id === restaurantId,
    );
    placeOrder({
      phoneNumber: "+584129251454",
      message: `Hola, me gustaría pedir: "${plate?.name}", ${restaurant && `del restaurante "${restaurant.name}", `}a nombre de: ${user.first_name} ${user.last_name}`,
    })
      .then((res) => toast("Opening whatsapp"))
      .catch((err) => toast.error(err.message));
  };

  const fetchPlate = async () => {
    const id = params.plateId;
    if (id === undefined) {
      toast.error("No se encontró el plato");
      return;
    }
    setLoading(true);
    fetchPlateById(id)
      .then((resPlate) => {
        setPlate(resPlate);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "🚀 ~ file: plate-details.tsx:45 ~ fetchPlate ~ err:",
          err,
        );
        toast.error(err.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (plate === undefined) {
      fetchPlate();
    }
  }, []);
  // -- END: Effects ------------------------------------------------------------

  if (plate === undefined && loading === true) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (plate === undefined) {
    return <Text>Plato no encontrado</Text>;
  }
  return (
    <View style={styles.container}>
      <Image source={plate.images[0]} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title} variant="headlineMedium">
            {plate.name}
          </Text>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: colors.primary }]}
          >
            ${plate.price ? Number(plate.price).toFixed(2) : 0}
          </Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text variant="bodyLarge">{plate.description}</Text>

          <Text variant="headlineSmall">Ingredientes</Text>
          <FlatList
            renderItem={({ item, index }) => (
              <Text key={index}>{`\u2022 ${item}`}</Text>
            )}
            data={plate.ingredients}
          />
        </View>
      </View>
      <FAB
        icon="whatsapp"
        onPress={handlePlaceOrder}
        style={[styles.FAB, { backgroundColor: colors.primary }]}
        color={colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.5,
  },

  detailsContainer: {
    flex: 1,
    gap: 40,
    position: "absolute",
    right: 0,
    left: 0,
    top: Dimensions.get("window").height / 2.7,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width - 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 40,
    paddingRight: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
  },

  bodyContainer: { gap: 20 },

  FAB: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
