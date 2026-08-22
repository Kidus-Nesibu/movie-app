import { Pressable, StyleSheet, Text } from "react-native";

type ProfileButtonProps = {
  onPress?: () => void;
};

export default function ProfileButton({ onPress }: ProfileButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.icon}>●</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 55,
    right: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    color: "#fff",
    fontSize: 22,
  },
});
