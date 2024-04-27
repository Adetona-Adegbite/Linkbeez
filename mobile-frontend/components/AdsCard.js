import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function AdsCard() {
  return (
    <View style={[styles.carouselItem, { backgroundColor: "#D9D9D9" }]}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get("window").width * 0.9, // Adjust width based on screen size
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Dimensions.get("window").width * 0.05,
    borderRadius: 7,
    elevation: 5,
    // For iOS:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});
