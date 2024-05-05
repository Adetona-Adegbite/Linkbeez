import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AdsCard({ image, profile_pic, item }) {
  const [saved, setSaved] = useState(false);
   useEffect(() => {
     const checkSaved = async () => {
       try {
         const savedItems = await AsyncStorage.getItem("savedItems");
         if (savedItems) {
           const parsedItems = JSON.parse(savedItems);
           const isSaved = parsedItems.some(
             (savedItem) => savedItem.id === item.id
           );
           setSaved(isSaved);
         }
       } catch (error) {
         console.error("Error checking if item is saved:", error);
         // Handle error if needed
       }
     };

     checkSaved();
   }, [item.id]);

   const saveHandler = async () => {
     try {
       if (!saved) {
         // Add item to AsyncStorage if it's not already saved
         let savedItems = await AsyncStorage.getItem("savedItems");
         savedItems = savedItems ? JSON.parse(savedItems) : [];
         savedItems.push(item);
         await AsyncStorage.setItem("savedItems", JSON.stringify(savedItems));
       } else {
         // Remove item from AsyncStorage if it's already saved
         let savedItems = await AsyncStorage.getItem("savedItems");
         savedItems = savedItems ? JSON.parse(savedItems) : [];
         const updatedItems = savedItems.filter(
           (savedItem) => savedItem.id !== item.id
         );
         await AsyncStorage.setItem("savedItems", JSON.stringify(updatedItems));
       }
       // Toggle the saved state after AsyncStorage update
       setSaved(!saved);
     } catch (error) {
       console.error("Error saving/removing item:", error);
       // Handle error if needed
     }
   };
  return (
    <View style={[styles.carouselItem, { backgroundColor: "#D9D9D9" }]}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{ uri: image }}
      />
      <Image
        style={{
          width: "20%",
          height: "50%",
          position: "absolute",
          bottom: 5,
          right: 5,
          borderRadius: 60,
        }}
        source={{ uri: `data:image/jpeg;base64,${profile_pic}` }}
      />
      <Icon
        name="heart"
        onPress={saveHandler}
        size={30}
        color={saved ? "red" : "white"}
        style={{
          position: "absolute",
          bottom: "65%",
          right: "8%",
        }}
      />
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
