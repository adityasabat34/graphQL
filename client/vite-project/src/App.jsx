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

const GET_USER_ID = gql`
  query GetUserByID($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_ID, {
    variables: { id: "2" },
  });

  if (loading) {
    return <p>Data Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (getUserByIdLoading) {
    return <p>user data is loading</p>;
  }

  if (getUserByIdError) {
    return <p>Error: {getUserByIdError.message}</p>;
  }

  return (
    <>
      <div>
        <h1>User by ID api call</h1>
        <div>{getUserByIdData.getUserById.name}</div>
      </div>
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
