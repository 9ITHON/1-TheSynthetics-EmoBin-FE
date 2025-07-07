export interface MyPageOption {
  title: string;
  description?: string;
  onPress?: () => void;
}

export interface ToggleSwitchProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}
