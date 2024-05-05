import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../components/ProfileCard";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    id: "1",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "2",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "3",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "4",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "5",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "6",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "7",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "8",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "9",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
  {
    id: "10",
    title: "David David",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lacus quis mi suscipit, eget sollicitudin lorem tincidunt. Nulla faucibus consectetur molestie. Cras eu metus sit amet sapien suscipit fermentum.",
  },
];

const SavedScreen = ({ navigation }) => {
  const route = useRoute();
  const [saved, setSaved] = useState();
  useLayoutEffect(() => {
    const getSaved = async () => {
      try {
        const savedItems = await AsyncStorage.getItem("savedItems");
        if (savedItems) {
          // Parse the retrieved string into an array
          // console.log(saved);
          setSaved(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error("Error retrieving saved items:", error);
        // Handle error if needed
      }
    };

    // Call the function to get saved items
    getSaved();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            user_first_name={item.user_first_name}
            user_last_name={item.user_last_name}
            description={item.description}
            rating={item.rating}
            profession={item.profession}
            profile_pic={item.profile_pic}
            user_id={item.user_id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default SavedScreen;
