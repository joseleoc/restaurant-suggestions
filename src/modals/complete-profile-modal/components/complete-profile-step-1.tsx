import { Control, FieldErrors } from "react-hook-form";
import { View } from "react-native";
import { styles } from "../complete-profile-modal.styles";
import { IconButton, useTheme } from "react-native-paper";
import InputController from "@/src/components/input-controller/Input-controller";

export interface CompleteProfileStep1Props {
  control: Control<any> | undefined;
  setNextStep: () => void;
  errors: FieldErrors<{
    name: string;
    lastName: string;
    phone: string;
  }>;
}

export default function CompleteProfileStep1({
  control,
  setNextStep,
  errors,
}: CompleteProfileStep1Props) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  const nextStep = () => {
    setNextStep();
  };
  // -- END: Data and Handlers --------------------------------------------------

  return (
    <View style={styles.formContainer}>
      <InputController
        name="name"
        control={control}
        rules={{ required: true }}
        label="Nombre"
        hasError={!!errors.name?.message?.toString()}
        errorMessage={errors.name?.message?.toString()}
      />

      <InputController
        name="lastName"
        control={control}
        rules={{ required: true }}
        label="Apellido"
        hasError={!!errors.lastName?.message?.toString()}
        errorMessage={errors.lastName?.message?.toString()}
      />

      <InputController
        name="phone"
        control={control}
        rules={{ required: true }}
        label="Número de Teléfono"
        hasError={!!errors.phone?.message?.toString()}
        errorMessage={errors.phone?.message?.toString()}
        keyboardType="phone-pad"
      />

      <IconButton
        icon="arrow-right"
        style={styles.nextButton}
        iconColor={colors.onPrimary}
        containerColor={colors.primary}
        onPress={() => nextStep()}
      />
    </View>
  );
}
