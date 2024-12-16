import {
  IconButton,
  Modal,
  Text,
  useTheme,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import CompleteProfileStep1 from "./components/complete-profile-step-1";
import CompleteProfileStep2 from "./components/complete-profile-step-2";

import { useStore } from "@/stores/stores";

import { Allergy } from "@/src/types/general.types";
import { CompleteProfileSchema } from "./complete-profile-form.schema";

import { styles } from "./complete-profile-modal.styles";
import { useUpdateUser } from "@/src/hooks/users";
import { toast } from "@backpackapp-io/react-native-toast";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();

  const {
    completeProfileModalIsOpen,
    pendingAllergies,
    allergies,
    user,
    setCompleteProfileModal,
  } = useStore();
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
      allergies: user?.allergies || [],
      name: user?.first_name || "",
      lastName: user?.last_name || "",
      phone: user?.phone_number || "",
    },
  });
  const {
    mutateAsync: updateUser,
    status: updateUserStatus,
    data: updateUserResponse,
  } = useUpdateUser();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

  const onsubmit = async () => {
    if (isValid && isLoading === false && user) {
      setIsLoading(true);
      const userId = user.id;
      const updatedUser = user;
      const formValues = getValues();
      updatedUser.first_name = formValues.name;
      updatedUser.last_name = formValues.lastName;
      updatedUser.phone_number = formValues.phone;
      updatedUser.allergies = formValues.allergies;
      updatedUser.profile_completed = true;
      await updateUser({ userId, data: updatedUser });
      setCompleteProfileModal(false);
    }
  };

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

  const handleButtonAction = () => {
    if (step === 1) {
      nextStep();
    } else {
      handleSubmit(onsubmit)();
    }
  };
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------

  useEffect(() => {
    if (updateUserStatus === "success") {
      toast.success("Datos actualizados");
      setIsLoading(false);
    }
    if (updateUserStatus === "error") {
      toast.error("Error al actualizar datos");
    }
    if (updateUserStatus === "pending") {
      setIsLoading(true);
    }
  }, [updateUserResponse, updateUserStatus]);

  useEffect(() => {
    if (user) {
      setValue("name", user?.first_name || "");
      setValue("lastName", user?.last_name || "");
      setValue("phone", user?.phone_number || "");
      user?.allergies?.forEach((id) => {
        const toInclude = allergies.find((al) => al.id === id);
        if (toInclude) {
          selectAllergy(toInclude);
        }
      });
    }
  }, []);
  // -- END: Effects ------------------------------------------------------------

  return (
    <Modal
      visible={completeProfileModalIsOpen}
      dismissable={false}
      style={styles.container}
    >
      <SafeAreaView>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: colors.surface }]}
        >
          {handleTitleLabel()}
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={40}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            {pendingAllergies || isLoading ? (
              <Button
                style={[styles.loader, { backgroundColor: colors.primary }]}
                mode="text"
              >
                <ActivityIndicator color={colors.onPrimary} size="small" />
              </Button>
            ) : (
              <IconButton
                disabled={isLoading}
                icon={step === 1 ? "arrow-right" : "content-save-all"}
                style={styles.nextButton}
                iconColor={colors.onPrimary}
                containerColor={colors.primary}
                onPress={handleButtonAction}
              />
            )}

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
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
