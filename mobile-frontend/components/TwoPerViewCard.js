import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

const RecentlyViewedCarousel = ({ title }) => {
  return (
    <View style={styles.recentlyViewedContainer}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.recentlyViewedCarousel}
      >
        {/* Add your recently viewed items here */}
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 1</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.recentlyViewedCarouselItem]}>
          <Text>Item 2</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recentlyViewedContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#08A87E",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "NanumGothic_700Bold",
  },
  recentlyViewedCarousel: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "red",
    height: 130,
    paddingHorizontal: 13, // Ensure items start from the left
  },
  recentlyViewedCarouselItem: {
    width: Dimensions.get("window").width * 0.45,
    height: 130, // Adjust width based on screen size
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6, // Adjust margin between items
    borderRadius: 10, // Adjust border radius as needed
    padding: 0, // Add padding to improve spacing\
    backgroundColor: "#D9D9D9",
    elevation: 5,
    // For iOS:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});

export default RecentlyViewedCarousel;
