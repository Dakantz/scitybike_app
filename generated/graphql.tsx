import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** New recipe data */
export type CreateUserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  password: Scalars['String'],
  dob?: Maybe<Scalars['String']>,
  gender?: Maybe<Gender>,
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
  NotSpecified = 'NOT_SPECIFIED'
}

export type Mutation = {
   __typename?: 'Mutation',
  createUser: UserCreateResult,
};


export type MutationCreateUserArgs = {
  user: CreateUserInput
};

export type Query = {
   __typename?: 'Query',
  me: UserResult,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type UserCreateError = {
   __typename?: 'UserCreateError',
  code?: Maybe<Scalars['String']>,
  error: Scalars['String'],
};

export type UserCreateResult = User | UserCreateError;

export type UserFetchError = {
   __typename?: 'UserFetchError',
  error: Scalars['String'],
};

export type UserResult = User | UserFetchError;
export type CreateUserMutationVariables = {
  userInput: CreateUserInput
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) | (
    { __typename?: 'UserCreateError' }
    & Pick<UserCreateError, 'error' | 'code'>
  ) }
);

export const CreateUserDocument = gql`
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
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateUserMutation, CreateUserMutationVariables> & TChildProps;
export function withCreateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

    export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
    }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;