import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };

    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser() {
    this.setState({ loading: true }, () => {
      getUser().then((resolve) => {
        this.setState({ user: resolve.name, loading: false });
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="header">
        <Link
          to="/search"
          data-testid="link-to-search"
          className="search"
        >
          Pesquisar
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="favorites"
        >
          Favoritos
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="profile"
        >
          Perfil
        </Link>
        <h2 data-testid="header-user-name" className="user">
          Oi,
          {' '}
          { user }
        </h2>
      </header>
    );
  }
}
