import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { FontStyles } from "@/constants/Styles";
import { Button } from "react-native-paper";
import { Link, router } from "expo-router";

export default function Welcome() {
  const { colors } = useTheme();
  const handleNavigate = (route: "sign-in" | "sign-up") => {
    router.push(`/(auth)/${route}`);
  };
  return (
    <SafeAreaView>
      <View style={[styles.section, { backgroundColor: colors.primary }]}>
        <View style={styles.branding_container}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
          <View style={styles.branding_text_container}>
            {["Healthy", "Food"].map((str, ind) => (
              <Text
                key={ind}
                variant="headlineMedium"
                style={[{ color: colors.onPrimary }, FontStyles.headline]}
              >
                {str}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.title_container}>
          {["Tu", "app", "saludable"].map((str, ind) => (
            <Text
              key={ind}
              variant="displayLarge"
              style={[{ color: colors.onPrimary }, FontStyles.headline]}
            >
              {str}
            </Text>
          ))}
        </View>

        <View style={styles.actions_container}>
          <Button
            onPress={() => handleNavigate("sign-in")}
            mode="contained"
            textColor={colors.onSecondary}
            buttonColor={colors.secondary}
            contentStyle={[
              styles.button,
              { backgroundColor: colors.secondary },
            ]}
            labelStyle={[styles.button_text]}
          >
            Crear cuenta
          </Button>
          <Button
            onPress={() => handleNavigate("sign-up")}
            mode="contained"
            textColor={colors.onBackground}
            buttonColor={colors.background}
            contentStyle={[
              styles.button,
              { backgroundColor: colors.background },
            ]}
            labelStyle={[styles.button_text]}
          >
            Registrarme
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 64,
    alignContent: "space-between",
    justifyContent: "center",
    gap: 32,
  },
  branding_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 1,
  },
  branding_text_container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title_container: {
    gap: 8,
  },
  actions_container: {
    gap: 16,
    width: "100%",
  },
  button_text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    height: 48,
    borderRadius: 50,
    width: "100%",
  },
});
