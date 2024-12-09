import * as yup from "yup";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
} from "react-native";
import { styles } from "./sign-in-form.styles";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "./sign-up-form.schema";
import { useState } from "react";
import { toast } from "@backpackapp-io/react-native-toast";
import { signIn } from "@/src/auth/auth";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorCodes } from "@/constants/firebase-error-codes";
import { useStore } from "../../stores/stores";


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
          <View style={styles.inputContainer}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  label="Email"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.email?.message?.toString()}
                />
              )}
            />
            {errors.email?.message?.toString() && (
              <Text
                style={[
                  styles.errorMessage,
                  { color: colors.error, backgroundColor: colors.onBackground },
                ]}
              >
                {errors.email?.message?.toString()}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Contraseña"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.password?.message?.toString() && (
              <Text
                style={[
                  styles.errorMessage,
                  { color: colors.error, backgroundColor: colors.onBackground },
                ]}
              >
                {errors.password?.message?.toString()}
              </Text>
            )}
          </View>

          <Button
            disabled={isLoading}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text>Registrarme</Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
