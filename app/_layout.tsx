import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { useStore } from '@/stores';
import { auth } from '@/firebase';
import { getUser } from '@/services/auth/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // --- Hooks -----------------------------------------------------------------
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { user, setUser, resetUser } = useStore();
  // --- END: Hooks ------------------------------------------------------------

  // -- Local State -------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser != null && !!firebaseUser.uid) {
        getUser({ userId: firebaseUser.uid })
          .then((user) => {
            setUser(user);
            router.replace('/home');
          })
          .catch((error) => {
            console.error('🚀 ~ file: _layout.tsx:48 ~ getUser ~ error:', error);
            resetUser();
          });
      } else {
        router.replace('/(auth)');
        resetUser();
      }
    });

    // Clean up the subscription on unmount
    return () => {
      resetUser();
      unsubscribe();
    };
  }, []);
  // --- END: Effects -----------------------------------------------------------

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
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
