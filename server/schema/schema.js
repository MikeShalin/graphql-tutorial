const graphql = require('graphql');

const { GraphQLObjectType, GrahpQlString, GraphQLSchema } = graphql

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: GrahpQlString,
    name: GrahpQlString,
    genre: GrahpQlString,
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  movie: {
    type: MovieType,
    args: { id: { type: GrahpQlString } },
    resolve(parent, arg) {

    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
})