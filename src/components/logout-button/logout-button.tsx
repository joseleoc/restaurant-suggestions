import { useSignOut } from "@/src/hooks/users";
import { useStore } from "@/src/stores/stores";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export default function LogoutButton() {
  const { setCompleteProfileModal } = useStore();
  const { mutate: signOut } = useSignOut();
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton
        icon="account-circle"
        size={24}
        iconColor={colors.primary}
        onPress={() => setCompleteProfileModal(true)}
      />
      <IconButton
        icon="logout"
        size={24}
        iconColor={colors.primary}
        onPress={() => signOut()}
      />
    </View>
  );
}
