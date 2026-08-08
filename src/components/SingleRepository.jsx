import { View, StyleSheet, ScrollView } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { Pressable } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
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
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) return null;

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <ScrollView style={styles.container}>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={handleOpenGitHub}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SingleRepository;
