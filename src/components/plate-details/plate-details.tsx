import { Plate } from "@/src/types/general.types";
import { Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { placeOrder } from "@/src/services/plates.service";
import { useStore } from "@/stores/stores";

export default function PlateDetails(params: { plate: Plate | undefined }) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { user, recommendedRestaurants } = useStore();
  // --- END: Hooks ------------------------------------------------------------
  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------
  // --- Data and Handlers ------------------------------------------------------
  const { plate } = params;

  const handlePlaceOrder = () => {
    if (user?.phone_number) {
      const restaurantId = plate?.restaurant;
      const restaurant = recommendedRestaurants.find(
        (r) => r.id === restaurantId,
      );
      placeOrder({
        phoneNumber: user.phone_number,
        message: `Hola, me gustaría pedir: "${plate?.name}", ${restaurant && `del restaurante "${restaurant.name}", `}a nombre de: ${user.first_name} ${user.last_name}`,
      });
    }
  };
  // -- END: Data and Handlers --------------------------------------------------

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
