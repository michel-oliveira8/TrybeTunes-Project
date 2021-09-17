import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    console.log('oi');
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name } = this.state;
    const numMinCaracter = 2;
    return (
      <div data-testid="page-search">
        Pesquisa
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="name"
            placeholder="Nome do artista"
            onChange={ this.handleInput }
            d
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ name.length < numMinCaracter }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
