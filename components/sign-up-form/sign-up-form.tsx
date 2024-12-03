import * as yup from 'yup';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text, useTheme } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { auth } from '@/firebase';

import { styles } from './sign-up-form.styles';
import { signUpSchema } from './sign-up-form.schema';

export default function SignUpForm() {
  const { colors } = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: yup.Asserts<typeof signUpSchema>) => {
    console.log({ isValid });
    if (isValid) {
      const { email, password } = data;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log({ userCredential });
      } catch (error) {
        console.error('🚀 ~ file: sign-up-form.tsx:32 ~ onSubmit ~ error:', error);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                      icon={showPassword ? 'eye-off' : 'eye'}
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

          <View style={styles.inputContainer}>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirmar contraseña"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
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
            {errors.confirmPassword?.message?.toString() && (
              <Text
                style={[
                  styles.errorMessage,
                  { color: colors.error, backgroundColor: colors.onBackground },
                ]}
              >
                {errors.confirmPassword?.message?.toString()}
              </Text>
            )}
          </View>
          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text>Registrarme</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
