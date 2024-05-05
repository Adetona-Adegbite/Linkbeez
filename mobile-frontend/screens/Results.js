import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../components/ProfileCard";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Results = ({ navigation }) => {
  const [ads, setAds] = useState();
  const [loading, setLoading] = useState();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${route.params.category}`,
    });
    const category = route.params.category;
    async function getAllAds() {
      const userId = await AsyncStorage.getItem("user-id");
      console.log(userId);
      try {
        setLoading(true);
        const response = await fetch("http://172.20.10.4:5000/advertisements", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify({
            userId: userId,
            category: category,
          }), // Convert the body to JSON format
        });
        if (!response.ok) {
          throw new Error("Failed to fetch advertisements");
        }
        const data = await response.json();
        setAds(data.advertisements);
        console.log(data.advertisements);
        // console.log("Done");
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    }
    getAllAds();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
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

export default Results;
