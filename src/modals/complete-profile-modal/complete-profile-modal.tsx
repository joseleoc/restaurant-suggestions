import {
  IconButton,
  Modal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useStore } from "@/stores/stores";
import { useEffect } from "react";
import { styles } from "./complete-profile-modal.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import InputController from "@/src/components/input-controller/Input-controller";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompleteProfileSchema } from "./complete-profile-form.schema";

export default function CompleteProfile() {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  const { completeProfileModalIsOpen, setUser } = useStore();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CompleteProfileSchema),
  });

  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------

  const onsubmit = async (data: any) => {};

  const nextStep = () => {};
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
            Completar Perfil
          </Text>

          <View
            style={[styles.formContainer, { backgroundColor: colors.surface }]}
          >
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
