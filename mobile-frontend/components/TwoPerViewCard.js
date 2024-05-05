import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RecentlyViewedCarousel = ({ title, data }) => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const checkSavedItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem("savedItems");
        if (savedItems) {
          setSavedItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    checkSavedItems();
  }, []);

  const isItemSaved = (item) => {
    return savedItems.some((savedItem) => savedItem.id === item.id);
  };

  const saveHandler = async (item) => {
    try {
      let updatedItems = [];
      if (!isItemSaved(item)) {
        // Add item to AsyncStorage if it's not already saved
        updatedItems = [...savedItems, item];
      } else {
        // Remove item from AsyncStorage if it's already saved
        updatedItems = savedItems.filter(
          (savedItem) => savedItem.id !== item.id
        );
      }
      await AsyncStorage.setItem("savedItems", JSON.stringify(updatedItems));
      setSavedItems(updatedItems);
    } catch (error) {
      console.error("Error saving/removing item:", error);
    }
  };

  return (
    <View style={styles.recentlyViewedContainer}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recentlyViewedCarousel}
      >
        {data && data.map((item) => {
          console.log(item);
          return (
            <View key={item.id} style={styles.recentlyViewedCarouselItem}>
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                source={{ uri: item.images[0].image_url }}
              />
              <Image
                style={{
                  width: "25%",
                  height: "30%",
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  borderRadius: 60,
                }}
                source={{ uri: `data:image/jpeg;base64,${item.profile_pic}` }}
              />
              <Icon
                name="heart"
                onPress={() => saveHandler(item)}
                size={30}
                color={isItemSaved(item) ? "red" : "white"}
                style={{
                  position: "absolute",
                  bottom: "65%",
                  right: "8%",
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recentlyViewedContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    height: 130,
    paddingHorizontal: 13,
  },
  recentlyViewedCarouselItem: {
    width: Dimensions.get("window").width * 0.45,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 10,
    padding: 0,
    backgroundColor: "#D9D9D9",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});

export default RecentlyViewedCarousel;
