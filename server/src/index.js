//TODO
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
// const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { Author, Track } = require("./models");
const mocks = {
  // Query: () => ({
  //   tracksForHome: () => [...new Array(6)],
  // }),
  Track: () => ({
    id: () => "track_01",
    title: () => "grumpty cat",
    author: () => {
      return {
        name: "Grumpy Cat",
        photo:
          "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
      };
    },
    thumbnail: () =>
      "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

const resolvers = {
  Query: {
    tracksForHome: async () => await Track.find().populate('author'),
    track: async (_, { id }) => await Track.findById(id).populate('author'),
  },
  Mutation: {
    addTrack: async (_, { title, authorId, thumbnail, length, modulesCount }) => {
      const track = new Track({ title, author: authorId, thumbnail, length, modulesCount });
      await track.save();
      return track.populate('author');
    },
    updateTrack: async (_, { id, title, thumbnail, length, modulesCount }) => {
      const track = await Track.findByIdAndUpdate(
        id,
        { title, thumbnail, length, modulesCount },
        { new: true }
      ).populate('author');
      return track;
    },
    deleteTrack: async (_, { id }) => {
      const track = await Track.findByIdAndDelete(id).populate('author');
      return track;
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,resolvers,
  });
  const { url } = await startStandaloneServer(server);
  console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
}

startApolloServer();
