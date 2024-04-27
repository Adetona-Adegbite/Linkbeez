import { Pressable, StyleSheet, Text } from "react-native";

export default function PostButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Post</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 60,
    backgroundColor: "#08A87E",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  text: {
    fontFamily: "NanumGothic_700Bold",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
