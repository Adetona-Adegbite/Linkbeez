import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Explore() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const itemHeight = Dimensions.get("window").height - 90;
  const snapToInterval = itemHeight + 5; // Add some padding for spacing between items

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.itemContainer,
          { height: itemHeight },
          //   index % 2 == 0
          // ? { backgroundColor: "white" }
          { backgroundColor: "#ccc" },
        ]}
      >
        <Text>{item}</Text>
        <View style={styles.save}>
          <Icon size={38} color="white" name="heart" />
          <Text style={styles.saveText}>Save</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.nameText}>Person's Name</Text>
            <Text style={styles.captionText}>Caption</Text>
          </View>
          <View style={styles.dp}></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={array}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        snapToInterval={snapToInterval}
        decelerationRate="fast"
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  save: {
    position: "absolute",
    right: 20,
    top: "40%",
  },
  saveText: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 20,
    borderTopWidth: 1,

    borderTopColor: "rgba(0,0,0,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dp: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: "50%",
  },
  nameText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  captionText: {
    marginTop: 5,
  },
});
