import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSignOut } from "@/src/hooks/users";

export default function HomePage() {
  const { mutateAsync: handleLogout } = useSignOut();
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
