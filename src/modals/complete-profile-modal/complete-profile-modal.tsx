import {
  IconButton,
  Modal,
  Text,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import CompleteProfileStep1 from "./components/complete-profile-step-1";
import CompleteProfileStep2 from "./components/complete-profile-step-2";

import { useStore } from "@/stores/stores";

import { Allergy } from "@/src/types/general.types";
import { CompleteProfileSchema } from "./complete-profile-form.schema";

import { styles } from "./complete-profile-modal.styles";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { completeProfileModalIsOpen, pendingAllergies, allergies } =
    useStore();
  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CompleteProfileSchema),
    defaultValues: {
      allergies: [],
    },
  });

  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

  const onsubmit = useCallback(() => {
    if (isValid && isLoading === false) {
      setIsLoading(true);
    }
  }, [isLoading, isValid]);

  const selectAllergy = (allergy: Allergy) => {
    const selectedAllergies = getValues("allergies") || [];
    let newSelection = selectedAllergies;
    if (selectedAllergies.includes(allergy.id)) {
      newSelection = selectedAllergies.filter((id) => id !== allergy.id);
    } else {
      newSelection = [...selectedAllergies, allergy.id];
    }
    setValue("allergies", newSelection);
    setSelectedAllergies(newSelection);
    return newSelection;
  };

  const nextStep = useCallback(() => {
    trigger(["lastName", "phone", "name"]).then((areFieldsValid) => {
      if (areFieldsValid) {
        setStep(2);
      }
    });
  }, [trigger]);

  const previousStep = () => {
    if (step === 1 || step > 5) return;
    setStep((step) => step - 1);
  };

  const handleTitleLabel = useCallback(() => {
    if (step === 1) return "Completar Perfil";
    else if (step === 2) return "Preferencias alimenticias";
  }, [step]);

  const handleButtonAction = useCallback(() => {
    if (step === 1) {
      nextStep();
    } else {
      handleSubmit(onsubmit)();
    }
  }, [handleSubmit, nextStep, onsubmit, step]);
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
              <CompleteProfileStep1 control={control} errors={errors} />
            )}

            {step === 2 && (
              <CompleteProfileStep2
                initialSelectedAllergies={selectedAllergies}
                selectAllergy={selectAllergy}
                allergies={allergies}
                previousStep={previousStep}
                control={control}
              />
            )}

            {pendingAllergies ? (
              <View
                style={[styles.loader, { backgroundColor: colors.primary }]}
              >
                <ActivityIndicator color={colors.onPrimary} />
              </View>
            ) : (
              <IconButton
                icon={step === 1 ? "arrow-right" : "content-save-all"}
                style={styles.nextButton}
                iconColor={colors.onPrimary}
                containerColor={colors.primary}
                onPress={handleButtonAction}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
