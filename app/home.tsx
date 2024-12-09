import HomePage from "@/src/pages/home-page/home-page";
import { useStore } from "@/src/stores/stores";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // --- Hooks -----------------------------------------------------------------
  const { user, setCompleteProfileModal } = useStore();
  const pathName = usePathname();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // TODO - descomentar para mostrar modal de completar perfil
  // useEffect(() => {
  //   if (user != null && !user.profile_completed && pathName === "/home") {
  //     setCompleteProfileModal(true);
  //   }
  // }, [user, setCompleteProfileModal, pathName]);
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  // -- END: Effects ------------------------------------------------------------
  return (
    <SafeAreaView>
      <HomePage />
    </SafeAreaView>
  );
}
