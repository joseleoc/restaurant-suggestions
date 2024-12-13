import { View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./plate-card.styles";
import { Plate } from "@/src/types/general.types";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useState } from "react";

export interface PlateCardProps {
  plate: Plate;
}

export default function PlateCard({ plate }: PlateCardProps) {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
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
          >
            {plate.name}
          </Text>
          <Text variant="bodyMedium" numberOfLines={2} ellipsizeMode="tail">
            {plate.description}
          </Text>
        </View>
        <View style={styles.actions}>
          <Text
            style={[styles.priceLabel, { color: colors.primary }]}
            variant="headlineSmall"
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
    </View>
  );
}
