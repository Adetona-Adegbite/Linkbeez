import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Feather } from "@expo/vector-icons";

const BioInfoScreen = ({ navigation, route }) => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [locationFocus, setLocationFocus] = useState(false);
  const [professionFocus, setProfessionFocus] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const { firstName, lastName, email, password, profilePic } = route.params;
    // console.log(firstName, lastName, email, password);
    setUserData((prev) => ({
      ...prev,
      firstName,
      lastName,
      email,
      password,
      profilePic,
    }));
  }, []);
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);
  const handleNext = () => {
    // Validate and navigate to the next screen
    // if (bio && location && profession) {
    const dataToSend = { ...userData };

    if (location) {
      dataToSend.location = location;
    }
    if (profession) {
      dataToSend.profession = profession;
    }
    if (bio) {
      dataToSend.bio = bio.trim();
    }
    navigation.navigate("register3", {
      ...dataToSend,
    });
    // } else {
    //   // Handle validation error
    //   console.log("Validation error: Please fill in all fields");
    // }
  };
  const locationData = [
    { label: "Abia", value: "Abia" },
    { label: "Adamawa", value: "Adamawa" },
    { label: "Akwa Ibom", value: "Akwa Ibom" },
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Anambra", value: "Anambra" },
    { label: "Arizona", value: "Arizona" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "Bauchi", value: "Bauchi" },
    { label: "Bayelsa", value: "Bayelsa" },
    { label: "Benue", value: "Benue" },
    { label: "Borno", value: "Borno" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Cross River", value: "Cross River" },
    { label: "Delta", value: "Delta" },
    { label: "Ebonyi", value: "Ebonyi" },
    { label: "Edo", value: "Edo" },
    { label: "Ekiti", value: "Ekiti" },
    { label: "Enugu", value: "Enugu" },
    { label: "FCT - Abuja", value: "FCT - Abuja" },
    { label: "Florida", value: "Florida" },
    { label: "Gombe", value: "Gombe" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Imo", value: "Imo" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Jigawa", value: "Jigawa" },
    { label: "Kaduna", value: "Kaduna" },
    { label: "Kano", value: "Kano" },
    { label: "Kansas", value: "Kansas" },
    { label: "Katsina", value: "Katsina" },
    { label: "Kebbi", value: "Kebbi" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Kogi", value: "Kogi" },
    { label: "Kwara", value: "Kwara" },
    { label: "Lagos", value: "Lagos" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nasarawa", value: "Nasarawa" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Ogun", value: "Ogun" },
    { label: "Ondo", value: "Ondo" },
    { label: "Osun", value: "Osun" },
    { label: "Oyo", value: "Oyo" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Plateau", value: "Plateau" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "Rivers", value: "Rivers" },
    { label: "Sokoto", value: "Sokoto" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Taraba", value: "Taraba" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" },
    { label: "Yobe", value: "Yobe" },
    { label: "Zamfara", value: "Zamfara" },
  ];

  const professionData = [
    { label: "Music Production", value: "Music Production" },
    { label: "Live Performance", value: "Live Performance" },
    { label: "Video Production", value: "Video Production" },
    { label: "Logistics & Rental", value: "Logistics & Rental" },
    // Add more profession options as needed
  ];

  const renderLabel = (field, value, isFocus) => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {field === "location" ? "Location" : "Profession"}
        </Text>
      );
    }
    return null;
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tell us about you </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.optionalText}>Optional</Text>

        <View style={styles.dropdownContainer}>
          {/* {renderLabel("location", location, locationFocus)} */}
          <Dropdown
            style={[styles.dropdown, locationFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={locationData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!locationFocus ? "Select location" : "..."}
            searchPlaceholder="Search..."
            value={location}
            onFocus={() => setLocationFocus(true)}
            onBlur={() => setLocationFocus(false)}
            onChange={(item) => {
              setLocation(item.value);
              setLocationFocus(false);
            }}
            renderLeftIcon={() => (
              <EvilIcons
                style={styles.icon}
                color={locationFocus ? "blue" : "black"}
                name="location"
                size={20}
              />
            )}
          />
        </View>
        <Text style={styles.optionalText}>Optional</Text>

        <View style={styles.dropdownContainer}>
          {/* {renderLabel("profession", profession, professionFocus)} */}
          <Dropdown
            style={[
              styles.dropdown,
              professionFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={professionData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!professionFocus ? "Select profession" : "..."}
            searchPlaceholder="Search..."
            value={profession}
            onFocus={() => setProfessionFocus(true)}
            onBlur={() => setProfessionFocus(false)}
            onChange={(item) => {
              setProfession(item.value);
              setProfessionFocus(false);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name="briefcase-outline"
                style={[styles.icon, { paddingRight: 5 }]}
                color={professionFocus ? "blue" : "black"}
                size={18}
              />
            )}
          />
        </View>
        <Text style={styles.optionalText}>Optional</Text>

        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
    height: 300,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  picker: {
    borderRadius: 20,
    width: "100%",
    height: 100,
    justifyContent: "center",
    backgroundColor: "#fff",
    // overflow: "hidden",
    marginBottom: 20,
    // alignSelf: "center",
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
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    // borderColor: "gray",
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  optionalText: {
    opacity: 0.2,
    marginLeft: 3,
    marginBottom: 3,
  },
});

export default BioInfoScreen;
