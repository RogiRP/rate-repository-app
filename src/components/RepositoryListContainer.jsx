import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ selectedOrder, onOrderChange }) => (
  <View style={styles.pickerContainer}>
    <Picker selectedValue={selectedOrder} onValueChange={onOrderChange}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  onOrderChange,
}) => {
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
      ListHeaderComponent={
        <OrderPicker
          selectedOrder={selectedOrder}
          onOrderChange={onOrderChange}
        />
      }
    />
  );
};

export default RepositoryListContainer;
