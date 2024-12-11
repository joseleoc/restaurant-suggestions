import { useCallback, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { FlatList, Keyboard, Pressable, View } from "react-native";
import { Checkbox, IconButton, Text, useTheme } from "react-native-paper";

import { Allergy } from "@/src/types/general.types";

import { styles } from "../complete-profile-modal.styles";

interface CompleteProfileStep2Props {
  previousStep: () => void;
  control: Control<any> | undefined;
  allergies: Allergy[];
  selectAllergy: (allergy: Allergy) => string[];
  initialSelectedAllergies: string[];
}

export default function CompleteProfileStep2({
  previousStep,
  control,
  allergies,
  selectAllergy,
  initialSelectedAllergies,
}: CompleteProfileStep2Props) {
  // --- Hooks -----------------------------------------------------------------
  const { colors } = useTheme();
  // --- END: Hooks ------------------------------------------------------------

  // --- Local State ------------------------------------------------------------
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    initialSelectedAllergies,
  );
  // -- END: Local State --------------------------------------------------------
  // --- Data and Handlers ------------------------------------------------------

  const handleSelectAllergy = (allergy: Allergy) =>
    setSelectedAllergies(selectAllergy(allergy));

  const isSelected = useCallback(
    (id: string) => selectedAllergies.includes(id),
    [selectedAllergies],
  );

  const keyExtractor = (item: Allergy) => item.id;

  const renderItem = ({ item }: { item: Allergy }) => (
    <Pressable
      onPress={() => handleSelectAllergy(item)}
      key={item.id}
      style={styles.allergiesListItem}
    >
      <Checkbox
        color={colors.primary}
        uncheckedColor={colors.primary}
        status={isSelected(item.id) ? "checked" : "unchecked"}
      />
      <Text>{item.name}</Text>
    </Pressable>
  );

  // -- END: Data and Handlers --------------------------------------------------

  // --- Effects ----------------------------------------------------------------
  useEffect(() => {
    Keyboard.dismiss();
  }, []);
  // -- END: Effects ------------------------------------------------------------

  return (
    <View style={[styles.formContainer, { paddingTop: 15 }]}>
      <Controller
        control={control}
        name="allergies"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FlatList
            data={allergies}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      ></Controller>
      <IconButton
        icon="arrow-left"
        onPress={() => previousStep()}
        style={styles.backButton}
      />
    </View>
  );
}
