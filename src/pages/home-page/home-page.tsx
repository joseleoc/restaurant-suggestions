import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "@/firebase";

export default function HomePage() {
  const handleLogout = async () => {
    await auth.signOut();
  };
  return (
    <View>
      <Text>Home</Text>
      <Button
        onPress={() => handleLogout()}
        mode="contained-tonal"
        buttonColor="#3f9"
      >
        logout
      </Button>
    </View>
  );
}
