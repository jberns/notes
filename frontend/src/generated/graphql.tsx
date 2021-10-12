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
  content?: Maybe<Note>;
  page?: Maybe<Page>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['ID'];
  user: Scalars['String'];
  content: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  postMessage: Scalars['ID'];
  UserSignup: AuthPayload;
  UserLogin: AuthPayload;
  UserLogout: ResponseMessage;
  UserUpdate: User;
  createProject: Project;
  ProjectCreate: Project;
  PageCreate: Page;
  PageUpdate: Page;
};


export type MutationPostMessageArgs = {
  user: Scalars['String'];
  content: Scalars['String'];
};


export type MutationUserSignupArgs = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
};


export type MutationPageCreateArgs = {
  projectId: Scalars['ID'];
};


export type MutationPageUpdateArgs = {
  id: Scalars['ID'];
  content: Scalars['String'];
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
  blocks?: Maybe<Array<Maybe<Block>>>;
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
  blocks?: Maybe<Array<Maybe<Block>>>;
  project: Project;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  team?: Maybe<Array<Maybe<User>>>;
  owner?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  messages?: Maybe<Array<ChatMessage>>;
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getProject: Project;
  getAllProjects?: Maybe<Array<Maybe<Project>>>;
  getAllProjectsByUser?: Maybe<Array<Maybe<Project>>>;
  ProjectById?: Maybe<Project>;
  ProjectsAllByLoggedInUser?: Maybe<Array<Maybe<Project>>>;
  PageById?: Maybe<Page>;
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


export type QueryProjectByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPageByIdArgs = {
  id: Scalars['ID'];
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

export type Subscription = {
  __typename?: 'Subscription';
  messages?: Maybe<Array<ChatMessage>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role: Role;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type User_LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type User_LoginMutation = (
  { __typename?: 'Mutation' }
  & { UserLogin: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  ) }
);

export type User_SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type User_SignupMutation = (
  { __typename?: 'Mutation' }
  & { UserSignup: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  ) }
);

export type Project_CreateMutationVariables = Exact<{ [key: string]: never; }>;


export type Project_CreateMutation = (
  { __typename?: 'Mutation' }
  & { ProjectCreate: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  ) }
);

export type Page_CreateMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type Page_CreateMutation = (
  { __typename?: 'Mutation' }
  & { PageCreate: (
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'name'>
  ) }
);

export type Page_UpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type Page_UpdateMutation = (
  { __typename?: 'Mutation' }
  & { PageUpdate: (
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'name' | 'blocksArray'>
  ) }
);

export type PageAttributesFragment = (
  { __typename?: 'Page' }
  & Pick<Page, 'id' | 'name'>
);

export type ProjectAttributesFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name'>
  & { owner?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )>, team?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )>>> }
);

export type All_ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type All_ProjectsQuery = (
  { __typename?: 'Query' }
  & { ProjectsAllByLoggedInUser?: Maybe<Array<Maybe<(
    { __typename?: 'Project' }
    & { pages?: Maybe<Array<Maybe<(
      { __typename?: 'Page' }
      & PageAttributesFragment
    )>>> }
    & ProjectAttributesFragment
  )>>> }
);

export type Unique_ProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Unique_ProjectQuery = (
  { __typename?: 'Query' }
  & { ProjectById?: Maybe<(
    { __typename?: 'Project' }
    & ProjectAttributesFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  )> }
);

export type Get_All_UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_All_UsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  )>>> }
);

export type PageByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PageByIdQuery = (
  { __typename?: 'Query' }
  & { PageById?: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'name' | 'blocksArray'>
  )> }
);

export const PageAttributesFragmentDoc = gql`
    fragment PageAttributes on Page {
  id
  name
}
    `;
export const ProjectAttributesFragmentDoc = gql`
    fragment ProjectAttributes on Project {
  id
  name
  owner {
    id
    name
    email
  }
  team {
    id
    name
    email
  }
}
    `;
export const User_LoginDocument = gql`
    mutation USER_LOGIN($email: String!, $password: String!) {
  UserLogin(email: $email, password: $password) {
    user {
      id
      name
      email
    }
    token
  }
}
    `;
export type User_LoginMutationFn = Apollo.MutationFunction<User_LoginMutation, User_LoginMutationVariables>;

/**
 * __useUser_LoginMutation__
 *
 * To run a mutation, you first call `useUser_LoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUser_LoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUser_LoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUser_LoginMutation(baseOptions?: Apollo.MutationHookOptions<User_LoginMutation, User_LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<User_LoginMutation, User_LoginMutationVariables>(User_LoginDocument, options);
      }
export type User_LoginMutationHookResult = ReturnType<typeof useUser_LoginMutation>;
export type User_LoginMutationResult = Apollo.MutationResult<User_LoginMutation>;
export type User_LoginMutationOptions = Apollo.BaseMutationOptions<User_LoginMutation, User_LoginMutationVariables>;
export const User_SignupDocument = gql`
    mutation USER_SIGNUP($email: String!, $password: String!) {
  UserSignup(email: $email, password: $password) {
    user {
      id
      name
      email
    }
    token
  }
}
    `;
export type User_SignupMutationFn = Apollo.MutationFunction<User_SignupMutation, User_SignupMutationVariables>;

/**
 * __useUser_SignupMutation__
 *
 * To run a mutation, you first call `useUser_SignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUser_SignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSignupMutation, { data, loading, error }] = useUser_SignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUser_SignupMutation(baseOptions?: Apollo.MutationHookOptions<User_SignupMutation, User_SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<User_SignupMutation, User_SignupMutationVariables>(User_SignupDocument, options);
      }
export type User_SignupMutationHookResult = ReturnType<typeof useUser_SignupMutation>;
export type User_SignupMutationResult = Apollo.MutationResult<User_SignupMutation>;
export type User_SignupMutationOptions = Apollo.BaseMutationOptions<User_SignupMutation, User_SignupMutationVariables>;
export const Project_CreateDocument = gql`
    mutation PROJECT_CREATE {
  ProjectCreate {
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
export type Project_CreateMutationFn = Apollo.MutationFunction<Project_CreateMutation, Project_CreateMutationVariables>;

/**
 * __useProject_CreateMutation__
 *
 * To run a mutation, you first call `useProject_CreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProject_CreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectCreateMutation, { data, loading, error }] = useProject_CreateMutation({
 *   variables: {
 *   },
 * });
 */
export function useProject_CreateMutation(baseOptions?: Apollo.MutationHookOptions<Project_CreateMutation, Project_CreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Project_CreateMutation, Project_CreateMutationVariables>(Project_CreateDocument, options);
      }
export type Project_CreateMutationHookResult = ReturnType<typeof useProject_CreateMutation>;
export type Project_CreateMutationResult = Apollo.MutationResult<Project_CreateMutation>;
export type Project_CreateMutationOptions = Apollo.BaseMutationOptions<Project_CreateMutation, Project_CreateMutationVariables>;
export const Page_CreateDocument = gql`
    mutation PAGE_CREATE($projectId: ID!) {
  PageCreate(projectId: $projectId) {
    id
    name
  }
}
    `;
export type Page_CreateMutationFn = Apollo.MutationFunction<Page_CreateMutation, Page_CreateMutationVariables>;

/**
 * __usePage_CreateMutation__
 *
 * To run a mutation, you first call `usePage_CreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePage_CreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pageCreateMutation, { data, loading, error }] = usePage_CreateMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function usePage_CreateMutation(baseOptions?: Apollo.MutationHookOptions<Page_CreateMutation, Page_CreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Page_CreateMutation, Page_CreateMutationVariables>(Page_CreateDocument, options);
      }
export type Page_CreateMutationHookResult = ReturnType<typeof usePage_CreateMutation>;
export type Page_CreateMutationResult = Apollo.MutationResult<Page_CreateMutation>;
export type Page_CreateMutationOptions = Apollo.BaseMutationOptions<Page_CreateMutation, Page_CreateMutationVariables>;
export const Page_UpdateDocument = gql`
    mutation PAGE_UPDATE($id: ID!, $content: String!) {
  PageUpdate(id: $id, content: $content) {
    id
    name
    blocksArray
  }
}
    `;
export type Page_UpdateMutationFn = Apollo.MutationFunction<Page_UpdateMutation, Page_UpdateMutationVariables>;

/**
 * __usePage_UpdateMutation__
 *
 * To run a mutation, you first call `usePage_UpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePage_UpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pageUpdateMutation, { data, loading, error }] = usePage_UpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePage_UpdateMutation(baseOptions?: Apollo.MutationHookOptions<Page_UpdateMutation, Page_UpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Page_UpdateMutation, Page_UpdateMutationVariables>(Page_UpdateDocument, options);
      }
export type Page_UpdateMutationHookResult = ReturnType<typeof usePage_UpdateMutation>;
export type Page_UpdateMutationResult = Apollo.MutationResult<Page_UpdateMutation>;
export type Page_UpdateMutationOptions = Apollo.BaseMutationOptions<Page_UpdateMutation, Page_UpdateMutationVariables>;
export const All_ProjectsDocument = gql`
    query ALL_PROJECTS {
  ProjectsAllByLoggedInUser {
    ...ProjectAttributes
    pages {
      ...PageAttributes
    }
  }
}
    ${ProjectAttributesFragmentDoc}
${PageAttributesFragmentDoc}`;

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
export const Unique_ProjectDocument = gql`
    query UNIQUE_PROJECT($id: ID!) {
  ProjectById(id: $id) {
    ...ProjectAttributes
  }
}
    ${ProjectAttributesFragmentDoc}`;

/**
 * __useUnique_ProjectQuery__
 *
 * To run a query within a React component, call `useUnique_ProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnique_ProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnique_ProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnique_ProjectQuery(baseOptions: Apollo.QueryHookOptions<Unique_ProjectQuery, Unique_ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Unique_ProjectQuery, Unique_ProjectQueryVariables>(Unique_ProjectDocument, options);
      }
export function useUnique_ProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Unique_ProjectQuery, Unique_ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Unique_ProjectQuery, Unique_ProjectQueryVariables>(Unique_ProjectDocument, options);
        }
export type Unique_ProjectQueryHookResult = ReturnType<typeof useUnique_ProjectQuery>;
export type Unique_ProjectLazyQueryHookResult = ReturnType<typeof useUnique_ProjectLazyQuery>;
export type Unique_ProjectQueryResult = Apollo.QueryResult<Unique_ProjectQuery, Unique_ProjectQueryVariables>;
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
export const Get_All_UsersDocument = gql`
    query GET_ALL_USERS {
  getAllUsers {
    id
    email
    name
  }
}
    `;

/**
 * __useGet_All_UsersQuery__
 *
 * To run a query within a React component, call `useGet_All_UsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_All_UsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_All_UsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_All_UsersQuery(baseOptions?: Apollo.QueryHookOptions<Get_All_UsersQuery, Get_All_UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_All_UsersQuery, Get_All_UsersQueryVariables>(Get_All_UsersDocument, options);
      }
export function useGet_All_UsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_All_UsersQuery, Get_All_UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_All_UsersQuery, Get_All_UsersQueryVariables>(Get_All_UsersDocument, options);
        }
export type Get_All_UsersQueryHookResult = ReturnType<typeof useGet_All_UsersQuery>;
export type Get_All_UsersLazyQueryHookResult = ReturnType<typeof useGet_All_UsersLazyQuery>;
export type Get_All_UsersQueryResult = Apollo.QueryResult<Get_All_UsersQuery, Get_All_UsersQueryVariables>;
export const PageByIdDocument = gql`
    query PageById($id: ID!) {
  PageById(id: $id) {
    id
    name
    blocksArray
  }
}
    `;

/**
 * __usePageByIdQuery__
 *
 * To run a query within a React component, call `usePageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageByIdQuery(baseOptions: Apollo.QueryHookOptions<PageByIdQuery, PageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageByIdQuery, PageByIdQueryVariables>(PageByIdDocument, options);
      }
export function usePageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageByIdQuery, PageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageByIdQuery, PageByIdQueryVariables>(PageByIdDocument, options);
        }
export type PageByIdQueryHookResult = ReturnType<typeof usePageByIdQuery>;
export type PageByIdLazyQueryHookResult = ReturnType<typeof usePageByIdLazyQuery>;
export type PageByIdQueryResult = Apollo.QueryResult<PageByIdQuery, PageByIdQueryVariables>;