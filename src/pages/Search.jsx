import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ListAlbum from '../components/ListAlbum';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      albumList: [],
      returnApi: false,
      artist: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      name: target.value,
    });
  }

  async handleClick() {
    const { name } = this.state;
    this.setState({
      loading: true,
    });

    const albumList = await searchAlbumsAPI(name);
    this.setState({
      artist: name,
      loading: false,
      albumList,
      returnApi: true,
      name: '',
    });
  }

  render() {
    const { name, loading, albumList, returnApi, artist } = this.state;
    const numMinCaracter = 2;
    return (
      <div data-testid="page-search" className="main-home">
        <Header />
        { loading ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                name="artistName"
                placeholder="Nome do artista"
                onChange={ this.handleInput }
                className="input-artist-name"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ name.length < numMinCaracter }
                onClick={ this.handleClick }
                className="button-search"
              >
                Pesquisar
              </button>
            </form>
          )}
        {returnApi && albumList.length === 0 ? <p
          className="result-albums"
        >
          Poxa, nenhum álbum foi encontrado!
          {/* eslint-disable-next-line */}
        </p> : null}
        {albumList.length !== 0 ? <p
          className="result-albums"
        >
          {`Resultado de álbuns de: ${artist}`}
          {/* eslint-disable-next-line */}
        </p>
          : null }
        <div className="acima-retangle">
          {albumList.map((
            { artistName, collectionId, artworkUrl100, collectionName },
          ) => (<ListAlbum
            key={ collectionId }
            artistName={ artistName }
            collectionId={ collectionId }
            artworkUrl100={ artworkUrl100 }
            collectionName={ collectionName }
          />))}
        </div>

      </div>
    );
  }
}
