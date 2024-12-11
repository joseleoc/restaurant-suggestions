import { Controller } from "react-hook-form";
import { View } from "react-native";
import { TextInput, useTheme, HelperText } from "react-native-paper";
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
  icon,
  onPressIcon,
  secureTextEntry,
  autoFocus,
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
            autoFocus={autoFocus || false}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry || false}
            style={[
              styles.input,
              inputStyle,
              { backgroundColor: colors.surface },
            ]}
            outlineColor={colors.primary}
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
      <HelperText visible={hasError} type="error">
        {errorMessage}
      </HelperText>
    </View>
  );
}

