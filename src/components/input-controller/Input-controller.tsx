import { Controller } from "react-hook-form";
import { View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { styles } from "./input-controller.styles";
import { InputControllerProps } from "./input-controller.constants";

export default function InputController({
  name,
  control,
  rules,
  keyboardType,
  label,
  hasError,
  errorMessage,
  inputStyle,
  containerStyle,
  errorMessageStyle,
  icon,
  onPressIcon,
  secureTextEntry,
}: InputControllerProps) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  // -- END: Local State --------------------------------------------------------

  // --- Data and Handlers ------------------------------------------------------
  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  // -- END: Effects ------------------------------------------------------------

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            style={[styles.input, inputStyle]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!hasError}
            label={label}
            right={
              icon ? (
                <TextInput.Icon
                  icon={icon}
                  onPress={() => onPressIcon && onPressIcon()}
                />
              ) : null
            }
          />
        )}
      />

      {hasError && (
        <Text
          style={[
            styles.errorMessage,
            { color: colors.error, backgroundColor: colors.onBackground },
            errorMessageStyle,
          ]}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
