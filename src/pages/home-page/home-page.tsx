import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./home-page.styles";
import RestaurantSuggestions from "@/src/components/restaurants-suggestions/restaurant-suggestions";
import PlatesSuggestions from "@/src/components/plates-suggestions/plates-suggestions";
import { useSignOut } from "@/src/hooks/users";

export default function HomePage() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { mutate: signOut } = useSignOut();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  return (
    <View style={[styles.homeContainer, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Text>Home</Text>
      </View>

      <View style={styles.mainContent}>
        <Text variant="headlineMedium" style={styles.contentTitle}>
          Tal vez te gustaría probar
        </Text>
        <RestaurantSuggestions />
        <PlatesSuggestions />
      </View>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </View>
  );
}
