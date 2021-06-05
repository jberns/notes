import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
  token: Scalars['String'];
};

export type Block = {
  __typename?: 'Block';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Note>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  signup: AuthPayload;
  login: AuthPayload;
  logout: ResponseMessage;
  updateUser: User;
  createProject: Project;
};


export type MutationSignupArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  type?: Maybe<NoteType>;
  creator?: Maybe<User>;
  assigned?: Maybe<User>;
  complete?: Maybe<Scalars['Boolean']>;
  block?: Maybe<Block>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum NoteType {
  Note = 'Note',
  Task = 'Task'
}

export type Page = {
  __typename?: 'Page';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  blocksArray?: Maybe<Scalars['String']>;
  project: Project;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  pages?: Maybe<Page>;
  team?: Maybe<Array<Maybe<User>>>;
  owner?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getProject: Project;
  getAllProjects?: Maybe<Array<Maybe<Project>>>;
  getAllProjectsByUser?: Maybe<Array<Maybe<Project>>>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllProjectsByUserArgs = {
  userId: Scalars['ID'];
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String'];
};

export enum Role {
  Admin = 'Admin',
  Base = 'Base',
  Premium = 'Premium',
  Enterprise = 'Enterprise'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role: Role;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'email'>
    ) }
  ) }
);

export type All_ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type All_ProjectsQuery = (
  { __typename?: 'Query' }
  & { getAllProjects?: Maybe<Array<Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  )>>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  )> }
);


export const LoginDocument = gql`
    mutation LOGIN($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      name
      email
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const All_ProjectsDocument = gql`
    query ALL_PROJECTS {
  getAllProjects {
    id
    name
    owner {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useAll_ProjectsQuery__
 *
 * To run a query within a React component, call `useAll_ProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAll_ProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAll_ProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAll_ProjectsQuery(baseOptions?: Apollo.QueryHookOptions<All_ProjectsQuery, All_ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<All_ProjectsQuery, All_ProjectsQueryVariables>(All_ProjectsDocument, options);
      }
export function useAll_ProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<All_ProjectsQuery, All_ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<All_ProjectsQuery, All_ProjectsQueryVariables>(All_ProjectsDocument, options);
        }
export type All_ProjectsQueryHookResult = ReturnType<typeof useAll_ProjectsQuery>;
export type All_ProjectsLazyQueryHookResult = ReturnType<typeof useAll_ProjectsLazyQuery>;
export type All_ProjectsQueryResult = Apollo.QueryResult<All_ProjectsQuery, All_ProjectsQueryVariables>;
export const MeDocument = gql`
    query ME {
  me {
    id
    email
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;