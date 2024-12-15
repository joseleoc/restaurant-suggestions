import { Plate, Restaurant } from "@/src/types/general.types";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { styles } from "./restaurant-details.styles";
import { Image } from "expo-image";
import PlatesGrid from "../plates-grid/plates-grid";
import { useEffect, useState } from "react";
import { fetchRestaurantPlates } from "@/src/services/restaurants.service";

export interface RestaurantDetailsProps {
  restaurant: Restaurant | undefined;
}

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [plates, setPlates] = useState<Plate[]>([]);
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  const getPlates = async () => {
    if (restaurant) {
      const plates = await fetchRestaurantPlates({
        restaurantId: restaurant.id,
        page: 0,
        page_size: 10,
      });
      setPlates(plates);
    }
  };

  // -- END: Data and Handlers --------------------------------------------------
  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    getPlates();
  }, []);
  // -- END: Effects ------------------------------------------------------------
  if (!restaurant) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image
          source={restaurant.images[0]}
          style={styles.backImage}
          accessibilityLabel={restaurant.name}
          alt={restaurant.name + " image"}
          contentFit="fill"
          blurRadius={10}
        />
        <Image
          source={restaurant.images[0]}
          style={styles.image}
          accessibilityLabel={restaurant.name}
          alt={restaurant.name + " image"}
          contentFit="contain"
        />
      </View>
      <View style={[styles.sectionContainer]}>
        <Text style={styles.restaurantName} variant="titleLarge">
          {restaurant.name}
        </Text>
        <Text style={styles.restaurantDescription} variant="bodyLarge">
          {restaurant.description}
        </Text>
        <View style={styles.addressContainer}>
          <Icon source="map-marker-circle" size={30} color={colors.primary} />
          <Text style={styles.restaurantAddress} variant="bodyMedium">
            {restaurant.address}
          </Text>
        </View>
        <PlatesGrid plates={plates} />
      </View>
    </View>
  );
}
