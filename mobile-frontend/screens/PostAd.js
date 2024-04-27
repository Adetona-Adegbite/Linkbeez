import React, { useEffect, useLayoutEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem from Expo

import PostButton from "../components/SubmitButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostAd({ navigation }) {
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [adName, setAdName] = useState("");
  const [description, setDescription] = useState("");
  const [jobCategory, setJobCategory] = useState("");

  const pickImage = async () => {
    if (images.length >= 3) {
      alert("You can only add a maximum of 3 pictures.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImages((prev) => {
        return [...prev, result.assets[0]];
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updatedImages = [...prev];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleAdNameChange = (text) => {
    setAdName(text);
  };

  const handleJobCategoryChange = (value) => {
    setJobCategory(value);
  };

  const handlePackageChange = (value) => {
    setPackageOption(value);
  };

  const createHandler = async () => {
    try {
      const formData = new FormData();
      const binary_images = [];
      const user_id = await AsyncStorage.getItem("user-id");
      formData.append("user_id", user_id);
      formData.append("title", adName);
      formData.append("description", description);
      formData.append("category", jobCategory);
      images.forEach((image) => {
        formData.append("images", {
          name: new Date() + image.fileName,
          uri: image.uri,
          type: image.type,
        });
      });
      // formData.append("image", [
      //   {
      //     name: new Date() + images[0].fileName,
      //     uri: images[0].uri,
      //     type: "image/jpg",
      //   },
      // ]);
      // images.forEach((image, index) => {
      //   formData.append(`image_${index}`, {
      //     uri: image.uri,
      //     name: `image_${index}.jpg`,
      //     type: "image/jpeg",
      //   });
      // });

      const response = await fetch(
        "http://172.20.10.2:5000/new-advertisement",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        console.log(JSON.stringify(response));
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData.data);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message);
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name of Ad</Text>
            <TextInput
              style={styles.input}
              value={adName}
              onChangeText={handleAdNameChange}
              placeholder="Enter the name of your ad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]} // Adjust height as needed
              multiline
              value={description}
              onChangeText={setDescription}
              placeholder="Enter a description for your ad"
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Job Category</Text>
            <Picker
              selectedValue={jobCategory}
              onValueChange={handleJobCategoryChange}
              style={styles.picker}
              itemStyle={{ fontSize: 16 }}
            >
              <Picker.Item label="Select Job Category" value="" />
              <Picker.Item label="Category 1" value="category1" />
              <Picker.Item label="Category 2" value="category2" />
              <Picker.Item label="Category 3" value="category3" />
            </Picker>
          </View>
          {/* <View style={styles.pickerContainer}>
            <Text style={styles.label}>Package Option</Text>
            <Picker
              selectedValue={packageOption}
              onValueChange={handlePackageChange}
              style={styles.picker}
              itemStyle={{ fontSize: 16 }}
            >
              <Picker.Item label="Select Package" value="" />
              <Picker.Item label="Bronze" value="bronze" />
              <Picker.Item label="Silver" value="silver" />
              <Picker.Item label="Gold" value="gold" />
            </Picker>
          </View> */}
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <PostButton onPress={createHandler} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 10,
  },
  picker: {
    borderRadius: 20,
    width: "100%",
    height: "15%",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  imageContainer: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 250,

    borderRadius: 10,
    aspectRatio: 16 / 9,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    width: 150,
    height: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 60,
    color: "#757575",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
