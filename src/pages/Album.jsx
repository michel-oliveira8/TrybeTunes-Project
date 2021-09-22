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
      music: [],
    };

    this.handleAlbum = this.handleAlbum.bind(this);
  }

  componentDidMount() {
    this.handleAlbum();
  }

  async handleAlbum() {
    const { match: { params: { id } } } = this.props;
    console.log(id);

    const musicAlbum = await getMusics(id);
    const delFirstTrack = musicAlbum.slice(1, musicAlbum.length);
    this.setState({
      artist: musicAlbum[0].artistName,
      collection: musicAlbum[0].collectionName,
      music: delFirstTrack,
    });
  }

  render() {
    const { artist, collection, music } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <p data-testid="artist-name">{ artist }</p>
        <p data-testid="album-name">{ collection }</p>
        {music.map(({ trackId, previewUrl, trackName }) => (<MusicCard
          key={ trackId }
          previewUrl={ previewUrl }
          trackName={ trackName }
        />))}
      </div>
    );
  }
}

Album.propTypes = ({
  match: PropTypes.object,
}).isRequired;
