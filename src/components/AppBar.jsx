import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  scrollView: {
    flexDirection: "row",
  },
  tab: {
    padding: 15,
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBarTab = ({ text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab text="Repositories" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
