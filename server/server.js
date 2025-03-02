import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: 1, name: "Aditya", age: 34, isMarried: false },
  { id: 2, name: "Shubh", age: 24, isMarried: true },
  { id: 3, name: "Soham", age: 54, isMarried: true },
  { id: 4, name: "Sahil", age: 32, isMarried: false },
];

const typeDefs = `
type Query {
  getUsers: [User]
  getUserById(id: ID!): User
}

type Mutation {
  createUser(name: String!, age: Int!, isMarried: Boolean!): User
}

type User {
  id: ID
  name: String
  age: Int
  isMarried: Boolean
}
`;

const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (parent, args) =>
      users.find((user) => user.id === Number(args.id)),
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      console.log(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server Running at: ${url}`);
