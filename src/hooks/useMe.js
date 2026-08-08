import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = ({ includeReviews = false } = {}) => {
  const { data, error, loading } = useQuery(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  return { me: data ? data.me : undefined, error, loading };
};

export default useMe;
