const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5d22d7061c9d440000859679
  { "name": "Michael Radford", "age": 72 }, // 5d22d7521c9d44000085967a
  { "name": "James McTeigue", "age": 51 }, // 5d22d7b71c9d44000085967b
  { "name": "Guy Ritchie", "age": 50 }, // 5d22d7cc1c9d44000085967c
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5d22d7061c9d440000859679" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5d22d7521c9d44000085967a" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5d22d7b71c9d44000085967b" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5d22d7cc1c9d44000085967c" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5c84c9a3fb6fc0720131f9af" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5d22d7061c9d440000859679" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5d22d7061c9d440000859679" },
    { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5d22d7cc1c9d44000085967c" },
];
const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];
const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve({ id }) {
        // return directors.find(({ id: directorId }) => directorId === id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movie: {
      type: new GraphQLList(MovieType),
      resolve({ id }) {
        // return movies.filter(({ directorId }) => directorId === id)
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        // return movies.find(({ id: moviesId }) => moviesId === id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        // return directors.find(({ id: directorsId }) => directorsId === id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        // return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        // return directors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});