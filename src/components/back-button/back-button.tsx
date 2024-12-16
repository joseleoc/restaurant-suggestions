import { IconButton } from "react-native-paper";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackButton() {
  // --- Hooks -----------------------------------------------------------------
  const [canGoBack, setCanGoBack] = useState(false);
  const insets = useSafeAreaInsets();
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and Handlers -----------------------------------------------------
  const goBack = () => {
    router.back();
  };
  // --- END: Data and Handlers ------------------------------------------------

  // --- Effects ---------------------------------------------------------------

  useEffect(() => {
    const canNavigateBack = router.canGoBack();
    setCanGoBack(canNavigateBack);
  }, []);
  // --- END: Effects ----------------------------------------------------------

  if (!canGoBack) {
    return null;
  }

  return (
    <IconButton
      icon="arrow-left"
      onPress={() => goBack()}
      iconColor="#000"
      style={[style.container, { top: insets.top + 5 }]}
    />
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    zIndex: 100,
    backgroundColor: "#fff",
  },
});
