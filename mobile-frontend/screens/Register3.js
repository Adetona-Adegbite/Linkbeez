import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SocialInfoScreen = ({ route }) => {
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    // console.log(route.params);
    setUserData((prev) => ({
      ...prev,
      ...route.params,
      instagram,
      linkedin,
      twitter,
      facebook,
    }));
  }, []);

  const handleRegister = async () => {
    const data = { ...userData };
    if (instagram.trim() !== "") {
      data.instagram = instagram;
    }
    if (linkedin.trim() !== "") {
      data.linkedin = linkedin;
    }
    if (twitter.trim() !== "") {
      data.twitter = twitter;
    }
    if (facebook.trim() !== "") {
      data.facebook = facebook;
    }
    try {
      const response = await fetch("http://172.20.10.2:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("request sent");

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData.user.user_id);
      await AsyncStorage.setItem(
        "user-id",
        JSON.stringify(responseData.user.user_id)
      );
      navigation.navigate("main");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Socials </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.optionalText}>Optional</Text>

        <TextInput
          style={styles.input}
          placeholder="Instagram"
          value={instagram}
          onChangeText={setInstagram}
        />
        <Text style={styles.optionalText}>Optional</Text>

        <TextInput
          style={styles.input}
          placeholder="LinkedIn"
          value={linkedin}
          onChangeText={setLinkedin}
        />
        <Text style={styles.optionalText}>Optional</Text>

        <TextInput
          style={styles.input}
          placeholder="Twitter"
          value={twitter}
          onChangeText={setTwitter}
        />
        <Text style={styles.optionalText}>Optional</Text>
        <TextInput
          style={styles.input}
          placeholder="Facebook"
          value={facebook}
          onChangeText={setFacebook}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 26,
    marginBottom: 30,
    color: "#333",
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#08A87E",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  optionalText: {
    opacity: 0.2,
    marginLeft: 3,
  },
});

export default SocialInfoScreen;
