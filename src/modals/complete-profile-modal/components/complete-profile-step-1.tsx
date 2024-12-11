import { View } from "react-native";
import { Control, FieldErrors } from "react-hook-form";

import InputController from "@/src/components/input-controller/Input-controller";

import { styles } from "../complete-profile-modal.styles";

export interface CompleteProfileStep1Props {
  control: Control<any> | undefined;
  errors: FieldErrors<{
    name: string;
    lastName: string;
    phone: string;
  }>;
}

export default function CompleteProfileStep1({
  control,

  errors,
}: CompleteProfileStep1Props) {
  // --- Hooks -----------------------------------------------------------------

  // --- END: Hooks ------------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

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
    </View>
  );
}
