import { View, StyleSheet } from "react-native";
import { Route, Switch } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact component={RepositoryList} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/repositories/:id" component={SingleRepository} />
        <Route path="/create-review" component={CreateReview} />
      </Switch>
    </View>
  );
};

export default Main;
