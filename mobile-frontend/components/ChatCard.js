import { StyleSheet, Text, View } from "react-native";

export default function ChatCard() {
  return (
    <View style={styles.card}>
      <View style={styles.leftCard}>
        <View style={styles.dp}></View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Joe</Text>
          <Text>new message</Text>
        </View>
      </View>
      <Text> 18min ago</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    height: 100,
    // borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 2,
  },
  dp: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  leftCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
