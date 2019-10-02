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
      },
      {
        "kind": "UNION",
        "name": "BikeUpdateResult",
        "possibleTypes": [
          {
            "name": "BikeUpdateFailure"
          },
          {
            "name": "BikeUpdateOk"
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

export type BikeRental = {
   __typename?: 'BikeRental',
  id: Scalars['ID'],
  startedAt: Scalars['String'],
  finishedAt?: Maybe<Scalars['String']>,
  bike: Bike,
  locations: Array<GeoPoint>,
  finished: Scalars['Boolean'],
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

/** Rental Transition Data */
export type BikeRentUpdateInput = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
  rentalId: Scalars['Int'],
};

export type BikeUpdateFailure = {
   __typename?: 'BikeUpdateFailure',
  message: Scalars['String'],
};

export type BikeUpdateOk = {
   __typename?: 'BikeUpdateOk',
  message: Scalars['String'],
  bike: Bike,
};

export type BikeUpdateResult = BikeUpdateFailure | BikeUpdateOk;

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

export type GeoPoint = {
   __typename?: 'GeoPoint',
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: UserCreateResult,
  rentBike: BikeRentResult,
  updateBikeRental: BikeUpdateResult,
  endBikeRental: BikeUpdateResult,
};


export type MutationCreateUserArgs = {
  user: CreateUserInput
};


export type MutationRentBikeArgs = {
  info: StartRentBikeInput
};


export type MutationUpdateBikeRentalArgs = {
  info: BikeRentUpdateInput
};


export type MutationEndBikeRentalArgs = {
  info: BikeRentUpdateInput
};

export type Query = {
   __typename?: 'Query',
  me: UserResult,
  availableBikes: Array<Bike>,
  rentals: Array<BikeRental>,
};


export type QueryRentalsArgs = {
  showAll: Scalars['Boolean']
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

export type RentBikeMutationVariables = {
  rentalInfo: StartRentBikeInput
};


export type RentBikeMutation = (
  { __typename?: 'Mutation' }
  & { rentBike: (
    { __typename?: 'BikeRentOk' }
    & Pick<BikeRentOk, 'id' | 'message'>
    & { bike: (
      { __typename?: 'Bike' }
      & Pick<Bike, 'id' | 'name' | 'type' | 'pin'>
    ) }
  ) | (
    { __typename?: 'BikeRentFailure' }
    & Pick<BikeRentFailure, 'code' | 'message'>
  ) }
);

export type UpdateBikeMutationVariables = {
  updateData: BikeRentUpdateInput
};


export type UpdateBikeMutation = (
  { __typename?: 'Mutation' }
  & { updateBikeRental: (
    { __typename?: 'BikeUpdateFailure' }
    & Pick<BikeUpdateFailure, 'message'>
  ) | (
    { __typename?: 'BikeUpdateOk' }
    & Pick<BikeUpdateOk, 'message'>
    & { bike: (
      { __typename?: 'Bike' }
      & Pick<Bike, 'id'>
    ) }
  ) }
);

export type MyRentalsQueryVariables = {
  showAll: Scalars['Boolean']
};


export type MyRentalsQuery = (
  { __typename?: 'Query' }
  & { rentals: Array<(
    { __typename?: 'BikeRental' }
    & Pick<BikeRental, 'id' | 'startedAt' | 'finishedAt' | 'finished'>
    & { bike: (
      { __typename?: 'Bike' }
      & Pick<Bike, 'id' | 'name' | 'type' | 'pin'>
    ), locations: Array<(
      { __typename?: 'GeoPoint' }
      & Pick<GeoPoint, 'lat' | 'lng'>
    )> }
  )> }
);

export type ReturnBikeMutationVariables = {
  endInfo: BikeRentUpdateInput
};


export type ReturnBikeMutation = (
  { __typename?: 'Mutation' }
  & { endBikeRental: (
    { __typename?: 'BikeUpdateFailure' }
    & Pick<BikeUpdateFailure, 'message'>
  ) | (
    { __typename?: 'BikeUpdateOk' }
    & Pick<BikeUpdateOk, 'message'>
    & { bike: (
      { __typename?: 'Bike' }
      & Pick<Bike, 'id'>
    ) }
  ) }
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
export const RentBikeDocument = gql`
    mutation RentBike($rentalInfo: StartRentBikeInput!) {
  rentBike(info: $rentalInfo) {
    ... on BikeRentFailure {
      code
      message
    }
    ... on BikeRentOk {
      id
      message
      bike {
        id
        name
        type
        pin
      }
    }
  }
}
    `;
export type RentBikeMutationFn = ApolloReactCommon.MutationFunction<RentBikeMutation, RentBikeMutationVariables>;
export type RentBikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RentBikeMutation, RentBikeMutationVariables>, 'mutation'>;

    export const RentBikeComponent = (props: RentBikeComponentProps) => (
      <ApolloReactComponents.Mutation<RentBikeMutation, RentBikeMutationVariables> mutation={RentBikeDocument} {...props} />
    );
    
export type RentBikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RentBikeMutation, RentBikeMutationVariables> & TChildProps;
export function withRentBike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RentBikeMutation,
  RentBikeMutationVariables,
  RentBikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RentBikeMutation, RentBikeMutationVariables, RentBikeProps<TChildProps>>(RentBikeDocument, {
      alias: 'rentBike',
      ...operationOptions
    });
};

    export function useRentBikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RentBikeMutation, RentBikeMutationVariables>) {
      return ApolloReactHooks.useMutation<RentBikeMutation, RentBikeMutationVariables>(RentBikeDocument, baseOptions);
    }
export type RentBikeMutationHookResult = ReturnType<typeof useRentBikeMutation>;
export type RentBikeMutationResult = ApolloReactCommon.MutationResult<RentBikeMutation>;
export type RentBikeMutationOptions = ApolloReactCommon.BaseMutationOptions<RentBikeMutation, RentBikeMutationVariables>;
export const UpdateBikeDocument = gql`
    mutation UpdateBike($updateData: BikeRentUpdateInput!) {
  updateBikeRental(info: $updateData) {
    ... on BikeUpdateFailure {
      message
    }
    ... on BikeUpdateOk {
      message
      bike {
        id
      }
    }
  }
}
    `;
export type UpdateBikeMutationFn = ApolloReactCommon.MutationFunction<UpdateBikeMutation, UpdateBikeMutationVariables>;
export type UpdateBikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateBikeMutation, UpdateBikeMutationVariables>, 'mutation'>;

    export const UpdateBikeComponent = (props: UpdateBikeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateBikeMutation, UpdateBikeMutationVariables> mutation={UpdateBikeDocument} {...props} />
    );
    
export type UpdateBikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateBikeMutation, UpdateBikeMutationVariables> & TChildProps;
export function withUpdateBike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateBikeMutation,
  UpdateBikeMutationVariables,
  UpdateBikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateBikeMutation, UpdateBikeMutationVariables, UpdateBikeProps<TChildProps>>(UpdateBikeDocument, {
      alias: 'updateBike',
      ...operationOptions
    });
};

    export function useUpdateBikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBikeMutation, UpdateBikeMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateBikeMutation, UpdateBikeMutationVariables>(UpdateBikeDocument, baseOptions);
    }
export type UpdateBikeMutationHookResult = ReturnType<typeof useUpdateBikeMutation>;
export type UpdateBikeMutationResult = ApolloReactCommon.MutationResult<UpdateBikeMutation>;
export type UpdateBikeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBikeMutation, UpdateBikeMutationVariables>;
export const MyRentalsDocument = gql`
    query MyRentals($showAll: Boolean!) {
  rentals(showAll: $showAll) {
    id
    startedAt
    finishedAt
    bike {
      id
      name
      type
      pin
    }
    locations {
      lat
      lng
    }
    finished
  }
}
    `;
export type MyRentalsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyRentalsQuery, MyRentalsQueryVariables>, 'query'> & ({ variables: MyRentalsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const MyRentalsComponent = (props: MyRentalsComponentProps) => (
      <ApolloReactComponents.Query<MyRentalsQuery, MyRentalsQueryVariables> query={MyRentalsDocument} {...props} />
    );
    
export type MyRentalsProps<TChildProps = {}> = ApolloReactHoc.DataProps<MyRentalsQuery, MyRentalsQueryVariables> & TChildProps;
export function withMyRentals<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyRentalsQuery,
  MyRentalsQueryVariables,
  MyRentalsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MyRentalsQuery, MyRentalsQueryVariables, MyRentalsProps<TChildProps>>(MyRentalsDocument, {
      alias: 'myRentals',
      ...operationOptions
    });
};

    export function useMyRentalsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyRentalsQuery, MyRentalsQueryVariables>) {
      return ApolloReactHooks.useQuery<MyRentalsQuery, MyRentalsQueryVariables>(MyRentalsDocument, baseOptions);
    }
      export function useMyRentalsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyRentalsQuery, MyRentalsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MyRentalsQuery, MyRentalsQueryVariables>(MyRentalsDocument, baseOptions);
      }
      
export type MyRentalsQueryHookResult = ReturnType<typeof useMyRentalsQuery>;
export type MyRentalsQueryResult = ApolloReactCommon.QueryResult<MyRentalsQuery, MyRentalsQueryVariables>;
export const ReturnBikeDocument = gql`
    mutation ReturnBike($endInfo: BikeRentUpdateInput!) {
  endBikeRental(info: $endInfo) {
    ... on BikeUpdateFailure {
      message
    }
    ... on BikeUpdateOk {
      message
      bike {
        id
      }
    }
  }
}
    `;
export type ReturnBikeMutationFn = ApolloReactCommon.MutationFunction<ReturnBikeMutation, ReturnBikeMutationVariables>;
export type ReturnBikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ReturnBikeMutation, ReturnBikeMutationVariables>, 'mutation'>;

    export const ReturnBikeComponent = (props: ReturnBikeComponentProps) => (
      <ApolloReactComponents.Mutation<ReturnBikeMutation, ReturnBikeMutationVariables> mutation={ReturnBikeDocument} {...props} />
    );
    
export type ReturnBikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ReturnBikeMutation, ReturnBikeMutationVariables> & TChildProps;
export function withReturnBike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ReturnBikeMutation,
  ReturnBikeMutationVariables,
  ReturnBikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ReturnBikeMutation, ReturnBikeMutationVariables, ReturnBikeProps<TChildProps>>(ReturnBikeDocument, {
      alias: 'returnBike',
      ...operationOptions
    });
};

    export function useReturnBikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReturnBikeMutation, ReturnBikeMutationVariables>) {
      return ApolloReactHooks.useMutation<ReturnBikeMutation, ReturnBikeMutationVariables>(ReturnBikeDocument, baseOptions);
    }
export type ReturnBikeMutationHookResult = ReturnType<typeof useReturnBikeMutation>;
export type ReturnBikeMutationResult = ApolloReactCommon.MutationResult<ReturnBikeMutation>;
export type ReturnBikeMutationOptions = ApolloReactCommon.BaseMutationOptions<ReturnBikeMutation, ReturnBikeMutationVariables>;
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