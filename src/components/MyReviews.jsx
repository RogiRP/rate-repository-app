import { View, StyleSheet, FlatList, Alert, Pressable } from "react-native";
import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
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
  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#0366d6",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#d73a4a",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onDelete }) => {
  const history = useHistory();
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(review.id),
        },
      ],
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
        <Text>{review.text}</Text>
        <View style={styles.buttonsRow}>
          <Pressable
            style={styles.viewButton}
            onPress={() =>
              history.push(`/repositories/${review.repository.id}`)
            }
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async (id) => {
    await deleteReview({ variables: { id } });
    refetch();
  };

  const reviews =
    data && data.me && data.me.reviews
      ? data.me.reviews.edges.map((edge) => edge.node)
      : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} onDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
