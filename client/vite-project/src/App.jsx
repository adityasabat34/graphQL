import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

const App = () => {
  const [newUser, setNewUser] = useState({});

  const { data, loading, error } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_ID, {
    variables: { id: "2" },
  });

  const [createUser] = useMutation(CREATE_USER);

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  return (
    <>
      <div>
        <input
          placeholder="enter your name"
          type="text"
          onChange={(e) => {
            setNewUser((prevVal) => ({ ...prevVal, name: e.target.value }));
          }}
        />
        <input
          placeholder="age..."
          type="number"
          onChange={(e) => {
            setNewUser((prevVal) => ({ ...prevVal, age: e.target.value }));
          }}
        />
        <button onClick={handleCreateUser}>Create user</button>
      </div>
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
