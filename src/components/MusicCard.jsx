import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
    this.handleFavoriteSong = this.handleFavoriteSong.bind(this);
    this.loadingFavoriteSong = this.loadingFavoriteSong.bind(this);
  }

  async componentDidMount() {
    this.loadingFavoriteSong();
  }

  async handleFavoriteSong() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      loading: false,
      checked: true,
    });
  }

  async loadingFavoriteSong() {
    const Favorite = await getFavoriteSongs();
    const { music } = this.props;
    Favorite.map((track) => {
      if (track.trackId === music.trackId) {
        return this.setState({ checked: true });
      } return false;
    });
  }

  render() {
    const { music: { trackId, previewUrl, trackName } } = this.props;
    const { checked, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ trackId }
            onChange={ this.handleFavoriteSong }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = ({
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
});
