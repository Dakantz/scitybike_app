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
export const GET_ME = gql`
  query Me {
    me {
      ... on User {
        id
        username
        email
        first_name
        last_name
      }
      ... on UserFetchError {
        error
      }
    }
  }
`;
