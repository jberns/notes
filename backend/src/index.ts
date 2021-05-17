const { ApolloServer, gql } = require("apollo-server")
import { Context, context } from './context'
import { makeExecutableSchema } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'

const typeDefs = gql`
  type User {
    email: String
    name: String
  }
  
  type Project {
    
  }

  type Note {
    
  }

  type Query {
    allPosts: [Post]
  }

  type Mutation {
    addPost: Post!
  }

  scalar DateTime
`;

const resolvers = {
  Query: {
    allPosts: (_parent, _args, context: Context) => {
      return context.prisma.post.findMany();
    },
  },
  Mutation: {
    addPost: (_parent, _args, context: Context) => {
      return context.prisma.post.create({
        data: {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
          author: {
            connect: { email: "alice@prisma.io" }
          }
        }
      })
    }
  }
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({ schema, context: context });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
