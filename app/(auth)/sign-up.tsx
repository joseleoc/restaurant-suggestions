import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <SafeAreaView>
      <View style={styles.section}>
        <Text>Sign Up</Text>
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
});
