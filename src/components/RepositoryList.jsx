import { useState } from "react";
import { useDebounce } from "use-debounce";
import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../hooks/useRepositories";

const getOrderVariables = (order) => {
  switch (order) {
    case "highest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    case "lowest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    default:
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...getOrderVariables(selectedOrder),
    searchKeyword: debouncedKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
    />
  );
};

export default RepositoryList;
