import { Modal, Text, TextInput, useTheme } from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useEffect } from "react";
import { styles } from "./complete-profile-modal.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { completeProfileModalIsOpen, setUser } = useStore();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({});

  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

  const onsubmit = async (data: any) => {};
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {}, [completeProfileModalIsOpen]);
  // -- END: Effects ------------------------------------------------------------

  return (
    <Modal
      visible={completeProfileModalIsOpen}
      dismissable={false}
      style={styles.container}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={40}
        >
          <View
            style={[styles.formContainer, { backgroundColor: colors.surface }]}
          >
            <TextInput placeholder="Nombre" mode="outlined" />
            <Text>CompleteProfile</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
