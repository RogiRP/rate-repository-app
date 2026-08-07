import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import Constants from "expo-constants";
import Main from "./src/components/Main";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        Constants.expoConfig?.extra?.apolloUri ||
        "http://192.168.1.68:4000/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

const apolloClient = createApolloClient();

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <StatusBar style="auto" />
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}
