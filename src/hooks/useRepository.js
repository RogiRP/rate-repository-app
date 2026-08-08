import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 3 },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : undefined;

  const fetchMoreReviews = () => {
    const canFetchMore =
      !loading && repository && repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        id,
        first: 3,
        after: repository.reviews.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextEdges = fetchMoreResult.repository.reviews.edges;
        const pageInfo = fetchMoreResult.repository.reviews.pageInfo;

        return nextEdges.length
          ? {
              repository: {
                ...previousResult.repository,
                reviews: {
                  ...previousResult.repository.reviews,
                  edges: [
                    ...previousResult.repository.reviews.edges,
                    ...nextEdges,
                  ],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });
  };

  return { repository, error, loading, fetchMoreReviews };
};

export default useRepository;
