import { ScrollView, TextInput } from "react-native";
import { Control, FieldErrors } from "react-hook-form";

import InputController from "@/src/components/input-controller/Input-controller";

import { styles } from "../complete-profile-modal.styles";
import { useEffect, useRef } from "react";

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

  // --- Refs ------------------------------------------------------------------
  const firstInputRef = useRef(null);
  // --- END: Refs -------------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    if (firstInputRef.current) {
      (firstInputRef.current as TextInput).focus();
    }
  }, [firstInputRef]);
  // -- END: Effects ------------------------------------------------------------

  return (
    <ScrollView style={styles.formContainer}>
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
    </ScrollView>
  );
}
