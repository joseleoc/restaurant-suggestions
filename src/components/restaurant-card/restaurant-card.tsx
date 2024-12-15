import { Restaurant } from "@/src/types/general.types";
import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./restaurant-card.styles";
import { Link } from "expo-router";

export interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={{
        pathname: "/details/restaurant/[id]",
        params: { id: restaurant.id },
      }}
      style={[styles.container, { backgroundColor: "#fff" }]}
    >
      <View style={styles.imageContainer}>
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
      <View style={styles.content}>
        <Text
          style={styles.title}
          variant="headlineSmall"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {restaurant.name}
        </Text>
        <Text variant="bodyMedium" numberOfLines={2} ellipsizeMode="tail">
          {restaurant.description}
        </Text>
        <Text variant="bodyMedium" numberOfLines={2} ellipsizeMode="tail">
          {restaurant.address}
        </Text>
      </View>
    </Link>
  );
}
