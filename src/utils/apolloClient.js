import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";

const apolloUri =
  Constants.expoConfig?.extra?.apolloUri ||
  Constants.manifest?.extra?.apolloUri;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: apolloUri,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
