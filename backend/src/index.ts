import { ApolloServer, gql } from "apollo-server"
import { Context, createContext } from './context'
import { makeExecutableSchema } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'


import { QueryResolvers, MutationResolvers, User } from "./types/resolvers-types"
import { APP_SECRET, getUserId } from "./utils"

import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { Role } from ".prisma/client"

interface Resolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
}

const typeDefs = gql`
  enum NoteType {
    Note,
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

  #GET
  type Query {
    me: User
    
    getUser(id: ID!): User
    getAllUsers: [User]

    getProject(id: ID!): Project!
    getAllProjects: [Project]
    getAllProjectsByUser(userId: ID!): [Project]

  }

  #CREATE UPDATE, DELETE
  type Mutation {
    signup(name:String!, email:String!, password:String!): AuthPayload!
    login(email:String!, password: String!): AuthPayload!
    updateUser(id: ID!, name:String!, email:String!): User!
    createProject: Project!
  }

  scalar DateTime
`;

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, context: Context) => {
      const userId = getUserId(context)
      return context.prisma.user.findUnique({
        where: {
          id: String(userId)
        }
      })
    },
    getUser: (_parent, args, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      })
    },
    getAllUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany()
    },

    getAllProjects: (_parent, _args, context: Context) => {
      return context.prisma.project.findMany({
        include: { owner: true }
      })
    }
  },

  Mutation: {
    signup: async (_parent, args, context: Context) => {
      const hashedPassword: string = await hash(args.password, 10)
      const user = await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: Role.Base
        }
      })

      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user
      }
    },
    login: async (_parent, args, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email
        }
      })

      if (!user) {
        throw new Error(`No user found for email: ${args.email}`)
      }

      const passwordValid: boolean = await compare(args.password, user.password)

      if (!passwordValid) {
        throw new Error('Invalid Password')
      }

      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user
      }

    },
    updateUser: (_parent, args, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.id
        },
        data: {
          name: args.name,
          email: args.email
        }
      })
    },
    createProject: (_parent, _args, context: Context) => {
      return context.prisma.project.create({
        data: {
          name: "New Project",
          owner: {
            connect: { email: "alice@prisma.io" }
          }
        },
        include: { owner: true }
      })
    },
  }
}

const schema = makeExecutableSchema({
  //@ts-ignore
  resolvers,
  typeDefs,
})

const server = new ApolloServer({ schema, context: createContext });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
