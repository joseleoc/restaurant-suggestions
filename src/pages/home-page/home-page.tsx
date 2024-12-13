import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { styles } from "./home-page.styles";
import RestaurantSuggestions from "@/src/components/restaurants-suggestions/restaurant-suggestions";
import PlatesSuggestions from "@/src/components/plates-suggestions/plates-suggestions";
import { useSignOut } from "@/src/hooks/users";
import { ScrollView } from "react-native-gesture-handler";

export default function HomePage() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { mutate: signOut } = useSignOut();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  return (
    <ScrollView
      style={[styles.homeContainer, { backgroundColor: colors.secondary }]}
      contentContainerStyle={styles.mainContentAlignment}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContent}>
        <Text variant="headlineLarge" style={styles.contentTitle}>
          Tal vez te gustes probar
        </Text>
        <PlatesSuggestions />
        <RestaurantSuggestions />
      </View>
      {/* <Button onPress={() => signOut()}>Sign Out</Button> */}
    </ScrollView>
  );
}
