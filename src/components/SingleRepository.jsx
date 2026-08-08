import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 14,
    margin: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
  reviewUsername: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewDate: {
    color: "grey",
    marginBottom: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={handleOpenGitHub}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewUsername}>{review.user.username}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMoreReviews } = useRepository(id);

  if (!repository) return null;

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMoreReviews}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
