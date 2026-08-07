import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import Text from "./Text";

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

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>{text}</Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign In" to="/sign-in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
