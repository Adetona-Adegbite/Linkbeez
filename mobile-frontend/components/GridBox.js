import { StyleSheet, Text, View } from "react-native";

const GridBox = ({ item }) => {
  return (
    <View style={styles.box}>
      <Text>Hello</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
  },
});
export default GridBox;
