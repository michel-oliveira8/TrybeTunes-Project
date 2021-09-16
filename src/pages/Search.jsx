import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Pesquisar
        <Header />
      </div>
    );
  }
}
