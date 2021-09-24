import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      collection: '',
      playlist: [],
    };

    this.handleAlbum = this.handleAlbum.bind(this);
  }

  componentDidMount() {
    this.handleAlbum();
  }

  async handleAlbum() {
    const { match: { params: { id } } } = this.props;
    const musicAlbum = await getMusics(id);
    const delFirstTrack = musicAlbum.slice(1, musicAlbum.length);
    this.setState({
      artist: musicAlbum[0].artistName,
      collection: musicAlbum[0].collectionName,
      playlist: delFirstTrack,
    });
  }

  render() {
    const { artist, collection, playlist } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <p data-testid="artist-name">{ artist }</p>
        <p data-testid="album-name">{ collection }</p>
        {playlist.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />))}
      </div>
    );
  }
}

Album.propTypes = ({
  match: PropTypes.object,
}).isRequired;
