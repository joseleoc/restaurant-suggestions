import * as yup from "yup";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { styles } from "./sign-in-form.styles";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Button, useTheme } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "./sign-in-form.schema";
import { useState } from "react";
import { toast } from "@backpackapp-io/react-native-toast";
import { signIn } from "@/src/auth/auth";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorCodes } from "@/constants/firebase-error-codes";
import { useStore } from "../../stores/stores";
import InputController from "../input-controller/Input-controller";

export default function SignInForm() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const { setUser } = useStore();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // --- END: Local State -------------------------------------------------------

  // --- Data and Handlers -----------------------------------------------------
  const onSubmit = async (data: yup.Asserts<typeof SignInSchema>) => {
    if (isValid && isLoading === false) {
      setIsLoading(true);
      const { email, password } = data;
      try {
        try {
          const user = await signIn({ email, password });
          setUser(user);
        } catch (error) {
          if (error instanceof FirebaseError) {
            console.error(
              "🚀 ~ file: sign-in-form.tsx:56 ~ onSubmit ~ error:",
              error,
            );
            if (error.code in FirebaseErrorCodes) {
              toast.error(
                FirebaseErrorCodes[
                  error.code as keyof typeof FirebaseErrorCodes
                ],
              );
            } else {
              toast.error("Error al registrar");
            }

            setIsLoading(false);
            return;
          }
        }
        toast.success("Login exitoso");
        setIsLoading(false);
      } catch (error: any) {
        console.error("🚀 ~ file: sign-in-form.tsx:36 ~ onSubmit ~ error:", {
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
        setIsLoading(false);
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
            containerStyle={styles.inputContainer}
            name="email"
            control={control}
            rules={{ required: true }}
            keyboardType="email-address"
            label="Email"
            hasError={!!errors.email?.message?.toString()}
            errorMessage={errors.email?.message?.toString()}
            inputStyle={styles.input}
          />

          <InputController
            containerStyle={styles.inputContainer}
            name="password"
            control={control}
            rules={{ required: true }}
            keyboardType="email-address"
            label="Contraseña"
            hasError={!!errors.password?.message?.toString()}
            errorMessage={errors.password?.message?.toString()}
            icon={showPassword ? "eye-off" : "eye"}
            onPressIcon={() => setShowPassword(!showPassword)}
            inputStyle={styles.input}
            secureTextEntry={!showPassword}
          />

          <Button
            disabled={isLoading}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={[
              styles.buttonContainer,
              styles.button,
              { backgroundColor: colors.secondary },
            ]}
            contentStyle={[
              styles.button,
              { backgroundColor: colors.secondary },
            ]}
            labelStyle={[styles.button_text, { color: colors.onSecondary }]}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onSecondary} />
            ) : (
              <> Iniciar Sesión</>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
