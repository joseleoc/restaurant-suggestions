import "react-native-reanimated";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, Portal, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { auth } from "@/firebase";
import { getUser } from "@/src/services/users.service";
import { theme } from "@/src/constants/Colors";
import { useStore } from "@/src/stores/stores";
import CompleteProfile from "@/src/modals/complete-profile-modal/complete-profile-modal";
import LogoutButton from "@/src/components/logout-button/logout-button";
import HeaderIcon from "@/src/components/header-icon/header-icon";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // --- Hooks -----------------------------------------------------------------
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { setUser, resetUser } = useStore();
  const { colors } = useTheme();
  const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <Portal>
              <CompleteProfile />
            </Portal>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#fad14b" },
              }}
            >
              <Stack.Screen name="(auth)" />
              <Stack.Screen
                name="home"
                options={{
                  headerShown: true,
                  title: "Healthy food",
                  headerRight: () => <LogoutButton />,
                  headerLeft: () => <HeaderIcon />,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" backgroundColor={colors.secondary} />
            <Toasts />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
