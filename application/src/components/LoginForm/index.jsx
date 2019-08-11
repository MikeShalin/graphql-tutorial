import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export default class Login extends Component {
  state = { email: '' };

  onChange = event => {
    const email = event.target.value;
    this.setState(s => ({ email }));
  };

  onSubmit = (client) => {
    localStorage.setItem('token', this.state.email);
    client.writeData({ data: { isLoggedIn: true } });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <div>Login</div>
            <form onSubmit={() => this.onSubmit(client)}>
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                data-testid="login-input"
                onChange={this.onChange}
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}
