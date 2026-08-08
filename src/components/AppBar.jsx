import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import { Link, useHistory } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import { useContext } from "react";
import Text from "./Text";
import { GET_ME } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

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

const AppBarTab = ({ text, onPress, to }) => {
  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>{text}</Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  const me = data ? data.me : null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab text="Repositories" to="/" />
        {me && <AppBarTab text="Create a review" to="/create-review" />}
        {me ? (
          <AppBarTab text="Sign out" onPress={handleSignOut} />
        ) : (
          <AppBarTab text="Sign in" to="/sign-in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
