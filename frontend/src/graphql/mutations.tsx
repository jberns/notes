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
