import { View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./plate-card.styles";
import { Plate } from "@/src/types/general.types";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { Link } from "expo-router";

export interface PlateCardProps {
  plate: Plate;
}

export default function PlateCard({ plate }: PlateCardProps) {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={{ pathname: "/details/plate/[id]", params: { id: plate.id } }}
      style={[styles.container, { backgroundColor: "#fff" }]}
    >
      <Image
        source={plate.images[0]}
        style={styles.image}
        accessibilityLabel={plate.name}
        alt={plate.name + " image"}
        contentFit="cover"
      />
      <View style={styles.content}>
        <View>
          <Text
            style={styles.title}
            variant="titleMedium"
            numberOfLines={2}
            ellipsizeMode="tail"
            adjustsFontSizeToFit
          >
            {plate.name}
          </Text>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            adjustsFontSizeToFit
            ellipsizeMode="tail"
          >
            {plate.description}
          </Text>
        </View>
        <View style={styles.actions}>
          <Text
            style={[styles.priceLabel, { color: colors.primary }]}
            variant="headlineSmall"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            ${plate.price ? Number(plate.price).toFixed(2) : 0}
          </Text>
          <IconButton
            icon={liked ? "heart" : "heart-outline"}
            onPress={() => setLiked(!liked)}
            size={24}
            iconColor={colors.primary}
          />
        </View>
      </View>
    </Link>
  );
}
