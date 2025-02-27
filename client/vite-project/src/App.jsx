import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) {
    return <p>Data Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Users</h1>

      <div>
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>age: {user.age}</p>
            <p>isMarried: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
