import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useStore } from "@/stores/stores";
import { useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function HeaderIcon() {
  const router = useRouter();
  const route = useRoute();
  const { user } = useStore();

  const handleRoute = useCallback(() => {
    if (user?.profile_completed) {
      if (route.name !== "home") {
        router.replace("/home");
      }
    } else {
      return router.replace("/(auth)");
    }
  }, [user, router, route]);
  return (
    <Pressable onPress={handleRoute}>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={{ width: 50, height: 50, borderRadius: 10, marginRight: 8 }}
      />
    </Pressable>
  );
}
