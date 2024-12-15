import { Plate } from "@/src/types/general.types";
import { useMemo } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import split from "just-split";
import { styles } from "./plates-grid.styles";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function PlatesGrid({
  plates,
  onScroll,
}: {
  plates: Plate[];
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}) {
  const { colors } = useTheme();

  const rows = useMemo(() => {
    return split(plates, 2);
  }, [plates]);

  const Card = ({ plate }: { plate: Plate }) => {
    return (
      <Link
        href={{ pathname: "/details/plate/[id]", params: { id: plate.id } }}
        key={plate.id}
        style={styles.link}
      >
        <View style={styles.cardContainer}>
          <Image source={{ uri: plate.images[0] }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text
                variant="bodyLarge"
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{ fontWeight: "bold", width: "50%", lineHeight: 18 }}
              >
                {plate.name}
              </Text>
              <Text
                variant="headlineSmall"
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{ color: colors.primary, fontWeight: "bold" }}
              >
                ${plate.price}
              </Text>
            </View>
            <Text numberOfLines={2}>{plate.description}</Text>
          </View>
        </View>
      </Link>
    );
  };

  return (
    <FlatList
      onScroll={(e) => onScroll && onScroll(e)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={rows}
      renderItem={({ item }) => (
        <View style={styles.rowContainer}>
          {item.map((plate) => (
            <Card plate={plate} />
          ))}
        </View>
      )}
    />
  );
}
