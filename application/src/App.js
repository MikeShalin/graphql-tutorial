import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './components/theme';
import Login from './components/LoginForm';
import { ApolloClient } from 'apollo-client'
import { ApolloProvider, Query } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Query query={IS_LOGGED_IN}>
            {({ data }) => (data.isLoggedIn ? <Tabs /> : <Login />)}
          </Query>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
