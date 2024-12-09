import HomePage from "@/src/pages/home.page";
import { useStore } from "@/src/stores/stores";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // --- Hooks -----------------------------------------------------------------
  const { user, setCompleteProfileModal } = useStore();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  useEffect(() => {
    if (user != null && !user.profile_completed) {
      setCompleteProfileModal(true);
    }
  }, [user, setCompleteProfileModal]);
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  // -- END: Effects ------------------------------------------------------------
  return (
    <SafeAreaView>
      <HomePage />
    </SafeAreaView>
  );
}
