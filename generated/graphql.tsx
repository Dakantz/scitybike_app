import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "UserResult",
        "possibleTypes": [
          {
            "name": "User"
          },
          {
            "name": "UserFetchError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UserCreateResult",
        "possibleTypes": [
          {
            "name": "User"
          },
          {
            "name": "UserCreateError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "BikeRentResult",
        "possibleTypes": [
          {
            "name": "BikeRentOk"
          },
          {
            "name": "BikeRentFailure"
          }
        ]
      }
    ]
  }
};

      export default result;
    /** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Bike = {
   __typename?: 'Bike',
  id: Scalars['ID'],
  name: Scalars['String'],
  type: Scalars['String'],
  pin?: Maybe<Scalars['String']>,
  location?: Maybe<GeoPoint>,
};

export type BikeRentFailure = {
   __typename?: 'BikeRentFailure',
  code: BikeRentFailureCode,
  message: Scalars['String'],
};

export enum BikeRentFailureCode {
  BikeNotAvailable = 'BIKE_NOT_AVAILABLE',
  UserNotLoggedIn = 'USER_NOT_LOGGED_IN',
  UserNotVerified = 'USER_NOT_VERIFIED',
  Other = 'OTHER'
}

export type BikeRentOk = {
   __typename?: 'BikeRentOk',
  id: Scalars['ID'],
  message: Scalars['String'],
  bike: Bike,
};

export type BikeRentResult = BikeRentOk | BikeRentFailure;

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

/** Rental End Data */
export type EndRentBikeInput = {
  bike_id: Scalars['Int'],
  start_lat: Scalars['Float'],
  start_lng: Scalars['Float'],
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
  NotSpecified = 'NOT_SPECIFIED'
}

export type GeoPoint = {
   __typename?: 'GeoPoint',
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

/** Rental Transition Data */
export type MidRentBikeInput = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: UserCreateResult,
  rentBike: BikeRentResult,
};


export type MutationCreateUserArgs = {
  user: CreateUserInput
};


export type MutationRentBikeArgs = {
  info: StartRentBikeInput
};

export type Query = {
   __typename?: 'Query',
  me: UserResult,
  availableBikes: Array<Bike>,
};

/** Rental Start Data */
export type StartRentBikeInput = {
  bike_id: Scalars['Int'],
  start_lat: Scalars['Float'],
  start_lng: Scalars['Float'],
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
export type AvialableBikesQueryVariables = {};


export type AvialableBikesQuery = (
  { __typename?: 'Query' }
  & { availableBikes: Array<(
    { __typename?: 'Bike' }
    & Pick<Bike, 'id' | 'name' | 'type'>
    & { location: Maybe<(
      { __typename?: 'GeoPoint' }
      & Pick<GeoPoint, 'lat' | 'lng'>
    )> }
  )> }
);

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

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'first_name' | 'last_name'>
  ) | (
    { __typename?: 'UserFetchError' }
    & Pick<UserFetchError, 'error'>
  ) }
);

export const AvialableBikesDocument = gql`
    query AvialableBikes {
  availableBikes {
    id
    name
    type
    location {
      lat
      lng
    }
  }
}
    `;
export type AvialableBikesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AvialableBikesQuery, AvialableBikesQueryVariables>, 'query'>;

    export const AvialableBikesComponent = (props: AvialableBikesComponentProps) => (
      <ApolloReactComponents.Query<AvialableBikesQuery, AvialableBikesQueryVariables> query={AvialableBikesDocument} {...props} />
    );
    
export type AvialableBikesProps<TChildProps = {}> = ApolloReactHoc.DataProps<AvialableBikesQuery, AvialableBikesQueryVariables> & TChildProps;
export function withAvialableBikes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AvialableBikesQuery,
  AvialableBikesQueryVariables,
  AvialableBikesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AvialableBikesQuery, AvialableBikesQueryVariables, AvialableBikesProps<TChildProps>>(AvialableBikesDocument, {
      alias: 'avialableBikes',
      ...operationOptions
    });
};

    export function useAvialableBikesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AvialableBikesQuery, AvialableBikesQueryVariables>) {
      return ApolloReactHooks.useQuery<AvialableBikesQuery, AvialableBikesQueryVariables>(AvialableBikesDocument, baseOptions);
    }
      export function useAvialableBikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AvialableBikesQuery, AvialableBikesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AvialableBikesQuery, AvialableBikesQueryVariables>(AvialableBikesDocument, baseOptions);
      }
      
export type AvialableBikesQueryHookResult = ReturnType<typeof useAvialableBikesQuery>;
export type AvialableBikesQueryResult = ApolloReactCommon.QueryResult<AvialableBikesQuery, AvialableBikesQueryVariables>;
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
export const MeDocument = gql`
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
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;