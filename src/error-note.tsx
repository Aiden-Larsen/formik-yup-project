import { Text } from "react-native";

type Props = {
  message?: string;
};

export function FormErrorNote({ message }: Props) {
  if (!message) return null;
  return <Text>{message}</Text>;
}
