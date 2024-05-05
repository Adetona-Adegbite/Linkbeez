import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StarRating = ({ rating, size = 20, color = "gold" }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  const stars = [];

  // Add filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <Icon key={i} name="star" size={size} color={color} style={styles.star} />
    );
  }

  // Add half star if applicable
  if (halfStar === 1) {
    stars.push(
      <Icon
        key="half"
        name="star-half-full"
        size={size}
        color={color}
        style={styles.star}
      />
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`empty${i}`}
        name="star-o"
        size={size}
        color={color}
        style={styles.star}
      />
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    marginRight: 2, // Adjust spacing between stars
  },
});

export default StarRating;
