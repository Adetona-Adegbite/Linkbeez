import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import StarRating from "./Stars";
import { useNavigation } from "@react-navigation/native";

const Card = ({
  title,
  description,
  profession,
  rating,
  user_first_name,
  user_last_name,
  profile_pic,
  user_id,
}) => {
  const navigation = useNavigation();
  function navigateHandler() {
    navigation.navigate("OtherProfile", { userId: user_id });
  }
  return (
    <View style={styles.card}>
      <Pressable onPress={() => navigateHandler()} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <Text style={styles.cardTitle}>
            {user_first_name} {user_last_name}
          </Text>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
            source={{ uri: `data:image/jpeg;base64,${profile_pic}` }}
          />
        </View>
        <Text style={{ fontWeight: "bold" }}>{profession}</Text>

        <Text style={styles.cardDescription}>{description}</Text>
        <StarRating rating={rating} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    gap: 5,
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
