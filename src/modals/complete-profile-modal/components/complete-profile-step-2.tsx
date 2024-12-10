import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { styles } from "../complete-profile-modal.styles";
import { Control } from "react-hook-form";
import InputController from "@/src/components/input-controller/Input-controller";
import { FlatList } from "react-native-gesture-handler";

interface CompleteProfileStep2Props {
  previousStep: () => void;
  control: Control<any> | undefined;
}

export default function CompleteProfileStep2({
  previousStep,
  control,
}: CompleteProfileStep2Props) {
  return (
    <View>
      <InputController name="allergies" control={control} label="Allergias" />
      <IconButton
        icon="arrow-left"
        onPress={() => previousStep()}
        style={styles.backButton}
      />
    </View>
  );
}
