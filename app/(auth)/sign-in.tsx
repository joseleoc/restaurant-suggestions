import { ImageBackground, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SignInForm from "@/src/components/sign-in-form/sign-in-form";
import BackButton from "@/src/components/back-button/back-button";

export default function SignInScreen() {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/images/backgrounds/tasty-bg.jpg")}
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
          style={styles.gradient_mask}
        />
        <View style={styles.section}>
          <SignInForm />
        </View>
        <BackButton />
      </ImageBackground>
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
  gradient_mask: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
