import React, { Component } from 'react';
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
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{ user }</h2>
      </header>
    );
  }
}
