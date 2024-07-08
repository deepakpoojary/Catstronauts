const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    " all the data for track I need for a home page"
    tracksForHome: [Track!]!
    track(id: ID!): Track
  }
  type Mutation {
    addTrack(
      title: String!
      authorId: ID!
      thumbnail: String
      length: Int
      modulesCount: Int
    ): Track
    updateTrack(
      id: ID!
      title: String
      thumbnail: String
      length: Int
      modulesCount: Int
    ): Track
    deleteTrack(id: ID!): Track
  }
  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
  }
  type Author {
    id: ID!
    name: String!
    photo: String
  }
`;

module.exports = typeDefs;
