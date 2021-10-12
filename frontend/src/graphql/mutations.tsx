import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
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

export const USER_SIGNUP = gql`
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

export const PROJECT_CREATE = gql`
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

export const PAGE_CREATE = gql`
  mutation PAGE_CREATE($projectId: ID!) {
    PageCreate(projectId: $projectId) {
      id
      name
    }
  }
`;

export const PAGE_UPDATE = gql`
  mutation PAGE_UPDATE($id: ID!, $content: String!) {
    PageUpdate(id: $id, content: $content) {
      id
      name
      blocksArray
    }
  }
`;
