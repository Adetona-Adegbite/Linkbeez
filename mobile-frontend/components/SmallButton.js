import { Pressable, StyleSheet, Text } from "react-native";

export default function SmallButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 40,
    backgroundColor: "black",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "NanumGothic_700Bold",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
