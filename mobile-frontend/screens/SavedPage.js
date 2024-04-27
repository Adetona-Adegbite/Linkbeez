import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../components/ProfileCard";
import { useRoute } from "@react-navigation/native";

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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card title={item.title} description={item.description} />
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
