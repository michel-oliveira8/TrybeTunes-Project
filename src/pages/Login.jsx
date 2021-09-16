import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loading: false,
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { username } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name: username }).then(() => {
        this.setState({ loading: false, redirect: true });
      });
    });
  }

  render() {
    const { username, loading, redirect } = this.state;
    const numberMinCaracteres = 3;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form>
          Login:
          <input
            name="username"
            data-testid="login-name-input"
            type="text"
            value={ username }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ username.length < numberMinCaracteres }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>

    );
  }
}
