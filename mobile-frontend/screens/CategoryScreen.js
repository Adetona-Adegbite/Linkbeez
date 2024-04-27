import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import Card from "../components/ProfileCard";
import { useRoute } from "@react-navigation/native";

const CategoryScreen = ({ navigation }) => {
  const route = useRoute();

  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  // Set default selection to the first category
  useEffect(() => {
    if (productionItems.length > 0) {
      const firstCategory = productionItems[0].category;
      handleCategorySelect(firstCategory);
    }
  }, []);

  // Data
  const productionItems = [
    {
      category: "Music Production",
      items: [
        "Music producers",
        "Mix and mastering engineers",
        "Backup artists/choirs",
        "Songwriters",
        "Studio musicians",
        "Arrangers",
      ],
    },
    {
      category: "Live Performance",
      items: [
        "Sound setup/engineers for shows",
        "Lighting engineers for shows",
        "Guitarist",
        "Keyboardist",
        "Saxophonists",
        "Trumpeters",
        "Drummers",
        "Backing vocalists",
        "Dancers",
      ],
    },
    {
      category: "Video Production",
      items: [
        "Video directors",
        "Photographers",
        "Artwork/graphic designers",
        "Film location providers",
        "Set designs",
        "Props and extras",
        "Camera handler",
        "Hairdressers/barbers for shoots",
        "Video editors",
        "Colorists",
        "Storyboard artists",
        "Cinematographers",
      ],
    },
    {
      category: "Logistics & Rentals",
      items: [
        "Studio setup/padding",
        "Studio booking",
        "Rehearsal studio booking",
        "Audio event coverage",
        "Video event coverage",
        "Studio equipment rentals",
        "Sound equipment rental",
        "Video equipment/camera renters",
        "Speaker renter",
        "Light renter",
        "Sound renter",
        "Stage rental",
        "Vehicle rental",
        "Equipment transport services",
      ],
    },
  ];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Find and set subcategories based on the selected category
    const selectedCategoryData = productionItems.find(
      (item) => item.category === category
    );
    setSubcategories(selectedCategoryData ? selectedCategoryData.items : []);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {productionItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === item.category && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(item.category)}
          >
            <Text>{item.category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Render subcategories based on the selected category */}
        {selectedCategory && (
          <FlatList
            data={subcategories}
            contentContainerStyle={{ paddingBottom: 70 }}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.pressable,
                  pressed && styles.pressedStyle,
                ]}
              >
                <Text style={styles.text}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    gap: 10,
    paddingVertical: 10,
    paddingRight: 10,
  },
  sidebar: {
    flex: 2,
    backgroundColor: "#fffffa",
  },
  content: {
    flex: 4,
    padding: 20,
    backgroundColor: "#fffffa",
  },
  categoryItem: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
  selectedCategory: {
    borderLeftColor: "#08A87E",
    borderLeftWidth: 6,
    backgroundColor: "#FAFAFA",
  },
  pressable: {
    width: "auto",
    height: 50,
    marginBottom: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  pressedStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Darker background color when pressed
  },
  text: {
    fontSize: 18,
  },
});

export default CategoryScreen;
