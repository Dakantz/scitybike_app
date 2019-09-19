import gql from "graphql-tag";

export const MUT_CREATE_USER = gql`
  # Write your query or mutation here

  mutation createUser($userInput: CreateUserInput!) {
    createUser(user: $userInput) {
      ... on UserCreateError {
        error
        code
      }
      ... on User {
        id
        username
        email
      }
    }
  }
`;
