import * as yup from "yup";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { Button, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "./sign-up-form.styles";
import { signUpSchema } from "./sign-up-form.schema";
import { FirebaseError } from "firebase/app";
import { createUser } from "@/src/auth/auth";
import { FirebaseErrorCodes } from "@/constants/firebase-error-codes";
import { useStore } from "@/stores/stores";
import InputController from "../input-controller/Input-controller";

export default function SignUpForm() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const { setUser } = useStore();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // --- END: Local State -------------------------------------------------------

  // --- Data and Handlers -----------------------------------------------------
  const onSubmit = async (data: yup.Asserts<typeof signUpSchema>) => {
    if (isValid && isLoading === false) {
      setIsLoading(true);
      const { email, password } = data;
      try {
        const user = await createUser({ email, password });
        setUser(user);
        toast.success("Registro exitoso");
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error("🚀 ~ file: sign-up-form.tsx:36 ~ onSubmit ~ error:", {
          code: error.code,
          error,
        });
        if (error instanceof FirebaseError) {
          if (error.code in FirebaseErrorCodes) {
            toast.error(
              FirebaseErrorCodes[error.code as keyof typeof FirebaseErrorCodes],
            );
          } else {
            toast.error("Error al registrar");
          }
        } else {
          toast.error("Error al registrar");
        }
      }
    }
  };
  // --- END: Data and Handlers ------------------------------------------------

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={40}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <InputController
            name="email"
            control={control}
            rules={{ required: true }}
            keyboardType="email-address"
            label="Email"
            hasError={!!errors.email?.message?.toString()}
            errorMessage={errors.email?.message?.toString()}
          />

          <InputController
            name="password"
            control={control}
            rules={{ required: true }}
            keyboardType="email-address"
            label="Contraseña"
            hasError={!!errors.password?.message?.toString()}
            errorMessage={errors.password?.message?.toString()}
            icon={showPassword ? "eye-off" : "eye"}
            onPressIcon={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
          />

          <InputController
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            keyboardType="email-address"
            label="Confirmar contraseña"
            hasError={!!errors.confirmPassword?.message?.toString()}
            errorMessage={errors.confirmPassword?.message?.toString()}
            secureTextEntry={!showPassword}
            icon={showPassword ? "eye-off" : "eye"}
            onPressIcon={() => setShowPassword(!showPassword)}
          />

          <Button
            disabled={isLoading}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            buttonColor={colors.primary}
            style={[
              styles.button,
              styles.buttonContainer,
              { backgroundColor: colors.primary },
            ]}
            contentStyle={[styles.button, { backgroundColor: colors.primary }]}
            labelStyle={[styles.button_text, { color: colors.onPrimary }]}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <>Registrarme</>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
