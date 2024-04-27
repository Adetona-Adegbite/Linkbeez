import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function CreatePage() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("user-id");
        if (!userId) {
          // If userId does not exist, navigate to the register page
          navigation.navigate("login");
        } else {
          // If userId exists, navigate to the main page
          // navigation.navigate("Main");
        }
      } catch (error) {
        console.error("Error checking user ID:", error);
        // Handle error if needed
      }
    };

    // Call the function to check userId when component mounts
    checkUserId();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Post an Advertisment</Text>
          </View>
          <Text style={styles.cardDescription}>
            Promote your services through sponsored ads.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Advertisments", { data: "data" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create Ad</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Post a Highlight</Text>
          </View>
          <Text style={styles.cardDescription}>
            Share short, engaging video content with your audience.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Highlights", { data: "data" });
            }}
          >
            <Text style={styles.buttonText}>Create Reel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>Note:</Text>
        <Text style={styles.noteText}>
          All reels posted during an active ad subscription will be
          automatically removed once the subscription expires and put back after
          re subsrcibing.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffffa",
  },
  container: {
    justifyContent: "center",

    alignItems: "center",
  },
  card: {
    width: "70%",
    height: 240,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: "10%",
    paddingBottom: 10,
  },
  cardHeader: {
    backgroundColor: "#9CC4B9",
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#08A87E",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteContainer: {
    alignItems: "center",
    marginTop: 22,
    opacity: 0.3,
    width: "80%",
    alignSelf: "center",
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  noteText: {
    fontFamily: "NanumGothic_400Regular",
    textAlign: "center",
  },
});
