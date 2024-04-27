import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import PostButton from "../components/SubmitButton";

export default function PostReel() {
  const [videoUri, setVideoUri] = useState(null);
  const [description, setDescription] = useState("");
  const video = useRef();

  const getAudioPermissions = async () => {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status === "granted") {
        console.log("Audio permissions granted.");
      } else {
        console.log("Permission denied.");
      }
    } catch (error) {
      console.error("Error requesting audio permissions:", error);
    }
  };
  // getAudioPermissions();

  const handleVideoPick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      console.log(pickerResult);
      setVideoUri(pickerResult.assets[0].uri);
    }
  };

  const handlePost = () => {
    console.log("Video URI:", videoUri);
    console.log("Description:", description);
    // You can implement logic here to post the video and description
  };
  const removeVideo = () => {
    setVideoUri(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.videoContainer}>
            {videoUri ? (
              <View>
                <Video
                  source={{ uri: videoUri }}
                  ref={video}
                  style={styles.video}
                  useNativeControls
                  volume="1.0"
                  onError={(e) => console.log(e)}
                />
                <TouchableOpacity
                  onPress={removeVideo}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={handleVideoPick} style={styles.upload}>
                <Text style={styles.uploadText}>Pick Video</Text>
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
          <PostButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 60,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 9 / 16,
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  upload: {
    borderRadius: 10,

    width: "100%",
    aspectRatio: 9 / 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 20,
    color: "#757575",
  },
  descriptionInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
