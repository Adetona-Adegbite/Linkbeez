import { StyleSheet, View } from "react-native";

export default function PostCard() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 500,
    backgroundColor: "black",
    marginVertical: 10,
    borderRadius: 10,
  },
});
