import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { TextStyle, ViewStyle } from "react-native";

export type InputControllerProps = {
    name: string;
    control: Control<any> | undefined;
    rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >
    | undefined;
    keyboardType?: "email-address" | "numeric" | "phone-pad" | "ascii-capable";
    label: string;
    hasError?: boolean;
    errorMessage?: string;
    inputStyle?: TextStyle;
    containerStyle?: ViewStyle;
    errorMessageStyle?: TextStyle;
    icon?: string;
    onPressIcon?: () => void;
    secureTextEntry?: boolean
};
