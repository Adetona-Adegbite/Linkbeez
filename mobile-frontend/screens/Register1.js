import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons
import Title from "../components/App-Name";

import axios from "axios";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PersonalInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [base64Image, setBase64Image] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    // Validate and navigate to the next screen if all fields are filled
    // if (
    //   firstName &&
    //   lastName &&
    //   email &&
    //   password &&
    //   // confirmPassword === password
    // ) {
    navigation.navigate("register2", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profilePic: base64Image,
    });
    // } else {
    //   // Handle validation error
    //   console.log(
    //     "Validation error: Please fill in all fields and ensure passwords match"
    //   );
    // }
  };
  const [image, setImage] = useState(null);
  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
      console.log(base64.length);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // console.log(result);
      const response = await convertImageToBase64(result.assets[0].uri);
      // console.log(response);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/bg.jpg")}
      imageStyle={styles.imageStyle}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ position: "absolute", top: "14%", alignSelf: "center" }}>
          <Title size={40} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Register</Text>
          <View style={styles.inputContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: "blue", marginTop: 10 }}>Pick Image</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#777"
                style={styles.passwordIcon}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text>Already Have an account? Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  imageStyle: {
    opacity: 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  nextButton: {
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
    marginBottom: 3,
  },
});
export default PersonalInfoScreen;
