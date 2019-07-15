const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;
const USER = 'mike'
const PASS = '123'
const URI_DB = 'cluster0-on5fb.mongodb.net'
const NAME_DB = 'graphql-tutorial'
const CONNECTION_PARAMS = {
  retryWrites: true,
  w: 'majority',
  useNewUrlParser: true,
}


mongoose.connect(`mongodb+srv://${USER}:${PASS}@${URI_DB}/${NAME_DB}`, CONNECTION_PARAMS);

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.error('Connection error: ' + err))
dbConnection.once('open', () => console.warn('Connection to db!'))

app.listen(PORT, err => {
  err ? console.error(err) : console.log('server started!');
})