import { useSignOut } from "@/src/hooks/users";
import { IconButton, useTheme } from "react-native-paper";

export default function LogoutButton() {
  const { mutate: signOut } = useSignOut();
  const { colors } = useTheme();
  return (
    <IconButton
      icon="logout"
      size={24}
      iconColor={colors.primary}
      onPress={() => signOut()}
    />
  );
}
