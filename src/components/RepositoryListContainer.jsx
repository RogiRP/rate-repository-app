import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => history.push(`/repositories/${item.id}`)}
        >
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryListContainer;
