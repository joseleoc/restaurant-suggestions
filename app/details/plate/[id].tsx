import PlateDetails from "@/src/components/plate-details/plate-details";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@/src/stores/stores";
import { useMemo } from "react";

export default function PlateDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { plates } = useStore();

  const plate = useMemo(() => plates.find((p) => p.id === id), [plates, id]);

  return (
    <SafeAreaView style={styles.container}>
      <PlateDetails plate={plate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
