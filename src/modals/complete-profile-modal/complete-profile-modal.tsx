import { Modal, Text, useTheme } from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useCallback, useEffect, useState } from "react";
import { styles } from "./complete-profile-modal.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompleteProfileSchema } from "./complete-profile-form.schema";
import CompleteProfileStep1 from "./components/complete-profile-step-1";
import CompleteProfileStep2 from "./components/complete-profile-step-2";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { completeProfileModalIsOpen, setUser } = useStore();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CompleteProfileSchema),
  });

  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [step, setStep] = useState<number>(1);
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

  const onsubmit = async (data: any) => {};

  const nextStep = () => {
    trigger(["lastName", "phone", "name"]).then((areFieldsValid) => {
      if (areFieldsValid) {
        setStep((step) => 2);
        console.log("step: ", step);
      }
    });
  };

  const previousStep = () => {
    if (step === 1 || step > 5) return;
    setStep((step) => step - 1);
  };

  const handleTitleLabel = useCallback(() => {
    if (step === 1) return "Completar Perfil";
    else if (step === 2) return "Preferencias alimenticias";
  }, [step]);
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
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: colors.surface }]}
          >
            {handleTitleLabel()}
          </Text>

          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            {step === 1 && (
              <CompleteProfileStep1
                control={control}
                setNextStep={nextStep}
                errors={errors}
              />
            )}

            {step === 2 && (
              <CompleteProfileStep2
                previousStep={previousStep}
                control={control}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
