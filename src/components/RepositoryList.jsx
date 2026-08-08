import { useState } from "react";
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
  const { repositories } = useRepositories(getOrderVariables(selectedOrder));

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
    />
  );
};

export default RepositoryList;
