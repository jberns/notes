import { gql } from '@apollo/client';

export const CORE_PROJECT_FIELDS = gql`
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

export const ALL_PROJECTS = gql`
  query ALL_PROJECTS {
    ProjectsAllByLoggedInUser {
      ...ProjectAttributes
    }
  }
  ${CORE_PROJECT_FIELDS}
`;

export const UNIQUE_PROJECT = gql`
  query UNIQUE_PROJECT($id: ID!) {
    ProjectById(id: $id) {
      ...ProjectAttributes
    }
  }
  ${CORE_PROJECT_FIELDS}
`;

export const ME = gql`
  query ME {
    me {
      id
      email
      name
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GET_ALL_USERS {
    getAllUsers {
      id
      email
      name
    }
  }
`;
