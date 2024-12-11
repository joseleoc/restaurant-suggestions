import { IconButton } from "react-native-paper";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function BackButton() {
  // --- Hooks -----------------------------------------------------------------
  const [canGoBack, setCanGoBack] = useState(false);
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
      style={style.container}
    />
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 5,
    zIndex: 100,
  },
});
