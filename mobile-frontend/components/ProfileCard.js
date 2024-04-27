import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Card = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "gray",
            borderRadius: 50,
          }}
        ></View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={{ flexDirection: "row", gap: 2 }}>
        <Icon name="star" size={24} color="goldenrod" />
        <Icon name="star" size={24} color="goldenrod" />
        <Icon name="star" size={24} color="goldenrod" />
        <Icon name="star" size={24} color="goldenrod" />
        <Icon name="star" size={24} color="goldenrod" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 16,
  },
});
export default Card;
