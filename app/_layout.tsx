import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider, Portal } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { auth } from "@/firebase";
import { getUser } from "@/src/auth/auth";
import { theme } from "@/src/constants/Colors";
import { useStore } from "@/src/stores/stores";
import CompleteProfile from "@/src/modals/complete-profile-modal/complete-profile-modal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // --- Hooks -----------------------------------------------------------------
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { setUser, resetUser } = useStore();
  // --- END: Hooks ------------------------------------------------------------

  // -- Local State -------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser != null && !!firebaseUser.uid) {
        getUser({ userId: firebaseUser.uid })
          .then((user) => {
            setUser(user);
            router.replace("/home");
            if (loaded) {
              SplashScreen.hideAsync();
            }
          })
          .catch((error) => {
            console.error(
              "🚀 ~ file: _layout.tsx:48 ~ getUser ~ error:",
              error,
            );
            resetUser();
          });
      } else {
        if (loaded) {
          SplashScreen.hideAsync();
        }
        router.replace("/(auth)");
        resetUser();
      }
    });

    // Clean up the subscription on unmount
    return () => {
      resetUser();
      unsubscribe();
    };
  }, [resetUser, setUser, loaded]);

  // --- END: Effects -----------------------------------------------------------

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <CompleteProfile />
      </Portal>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="home" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <Toasts />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
