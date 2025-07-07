import { View, Text, Switch } from "react-native";
import { styles } from "./ToggleSwitch.styles";
import { ToggleSwitchProps } from "../../types/myPage";

const ToggleSwitch = ({
  label,
  description,
  value,
  onValueChange,
}: ToggleSwitchProps) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

export default ToggleSwitch;
