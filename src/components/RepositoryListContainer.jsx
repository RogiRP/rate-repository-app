import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  selectedOrder,
  onOrderChange,
  searchKeyword,
  onSearchChange,
}) => (
  <View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories..."
      value={searchKeyword}
      onChangeText={onSearchChange}
    />
    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedOrder} onValueChange={onOrderChange}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, onOrderChange, searchKeyword, onSearchChange } =
      this.props;
    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        onOrderChange={onOrderChange}
        searchKeyword={searchKeyword}
        onSearchChange={onSearchChange}
      />
    );
  };

  render() {
    const { repositories } = this.props;
    const history = this.props.history;

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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryListContainerWrapper = (props) => {
  const history = useHistory();
  return <RepositoryListContainer {...props} history={history} />;
};

export default RepositoryListContainerWrapper;
