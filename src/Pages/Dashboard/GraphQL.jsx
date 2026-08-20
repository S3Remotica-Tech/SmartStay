import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

function GraphQL() {
  const GET_LOCATIONS = gql`
    query {
      countries {
        code
        name
        emoji
        capital
      }
    }
  `;

  const { loading, error } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>GraphQL</div>;
}

export default GraphQL;
