import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

const EditProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("user-id");

      const response = await fetch(`http://172.20.10.4:5000/user/${userId}`);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setUserData(data.user);
      } else {
        console.error("Error fetching user data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    console.log("user data", userData);
    try {
      const userId = await AsyncStorage.getItem("user-id");

      const response = await fetch(`http://172.20.10.4:5000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        // Handle successful update
        console.log("User profile updated successfully");
        navigation.goBack();
      } else {
        console.error("Error updating user profile:", data.error);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          value={userData.first_name}
          onChangeText={(text) =>
            setUserData({ ...userData, first_name: text })
          }
        />
      </View>
      <View>
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          value={userData.last_name}
          onChangeText={(text) => setUserData({ ...userData, last_name: text })}
        />
      </View>
      <View>
        <Text>Bio</Text>
        <TextInput
          style={styles.input}
          value={userData.bio}
          onChangeText={(text) => setUserData({ ...userData, bio: text })}
        />
      </View>
      <View>
        <Text>Instagram</Text>
        <TextInput
          style={styles.input}
          value={userData.instagram}
          onChangeText={(text) => setUserData({ ...userData, instagram: text })}
        />
      </View>
      <View>
        <Text>Linkedin</Text>
        <TextInput
          style={styles.input}
          value={userData.linkedin}
          onChangeText={(text) => setUserData({ ...userData, linkedin: text })}
        />
      </View>
      <View>
        <Text>Twitter</Text>
        <TextInput
          style={styles.input}
          value={userData.twitter}
          onChangeText={(text) => setUserData({ ...userData, twitter: text })}
        />
      </View>
      <View>
        <Text>Facebook</Text>
        <TextInput
          style={styles.input}
          value={userData.facebook}
          onChangeText={(text) => setUserData({ ...userData, facebook: text })}
        />
      </View>
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default EditProfileScreen;
