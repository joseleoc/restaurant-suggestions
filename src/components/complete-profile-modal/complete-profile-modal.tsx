import { Modal, Text, TextInput, useTheme } from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useEffect } from "react";
import { styles } from "./complete-profile-modal.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { completeProfileModalIsOpen } = useStore();
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  useEffect(() => {}, [completeProfileModalIsOpen]);
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  // -- END: Effects ------------------------------------------------------------

  return (
    <Modal
      visible={completeProfileModalIsOpen}
      dismissable={false}
      style={styles.container}
    >
      <SafeAreaView>
        <View
          style={[styles.formContainer, { backgroundColor: colors.surface }]}
        >
          <TextInput placeholder="Nombre" mode="outlined" />
          <Text>CompleteProfile</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
