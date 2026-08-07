import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import Main from "./src/components/Main";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();

const createApolloClient = (storage) => {
  const httpLink = new HttpLink({
    uri:
      Constants.expoConfig?.extra?.apolloUri ||
      "http://192.168.1.68:4000/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await storage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

const apolloClient = createApolloClient(authStorage);

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
