import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type ChatMessage {
    id: ID!
    user: String!
    content: String!
  }

  enum NoteType {
    Note
    Task
  }

  enum Role {
    Admin
    Base
    Premium
    Enterprise
  }

  type User {
    id: ID!
    email: String
    name: String
    # creatorNotes: [Note]!
    # assignedNotes: [Note]!
    # projectOwner: [Project]!
    # projectTeam: [Project]!
    role: Role!
    # profile: Profile
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  # type Profile {
  #   id: Int!
  # }

  type Project {
    id: ID!
    name: String
    icon: String
    pages: Page
    team: [User]
    owner: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Page {
    id: ID!
    name: String
    icon: String
    blocksArray: String
    project: Project!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Block {
    id: ID!
    name: String
    content: Note
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Note {
    id: ID!
    text: String
    tag: String
    type: NoteType
    creator: User
    assigned: User
    complete: Boolean
    block: Block
    createdAt: DateTime
    updatedAt: DateTime
  }

  type ResponseMessage {
    message: String!
  }

  #GET
  type Query {
    messages: [ChatMessage!]

    me: User

    getUser(id: ID!): User
    getAllUsers: [User]

    getProject(id: ID!): Project!
    getAllProjects: [Project]
    getAllProjectsByUser(userId: ID!): [Project]
  }

  #CREATE UPDATE, DELETE
  type Mutation {
    postMessage(user: String!, content: String!): ID!
    UserSignup(name: String, email: String!, password: String!): AuthPayload!
    UserLogin(email: String!, password: String!): AuthPayload!
    UserLogout: ResponseMessage!
    UserUpdate(id: ID!, name: String!, email: String!): User!
    createProject: Project!
  }

  type Subscription {
    messages: [ChatMessage!]
  }

  scalar DateTime
`;
