import { gql } from "@apollo/client";

export const ALL_PROJECTS = gql`
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

export const ME = gql`
  query ME {
    me {
      id
      email
      name
    }
  }
`;
