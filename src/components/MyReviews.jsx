import { View, StyleSheet, FlatList } from "react-native";
import { format } from "date-fns";
import useMe from "../hooks/useMe";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewContent: {
    flex: 1,
  },
  repositoryName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewDate: {
    color: "grey",
    marginBottom: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me } = useMe({ includeReviews: true });

  const reviews =
    me && me.reviews ? me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
