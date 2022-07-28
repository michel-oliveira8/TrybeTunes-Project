import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ListAlbum extends Component {
  render() {
    const { artistName, collectionId, artworkUrl100, collectionName } = this.props;
    return (
      <div className="retangle">
        <img src={ artworkUrl100 } alt="capaDoAlbum" className="picture-album" />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="collection-name"
        >
          { collectionName }
        </Link>
        <p className="artist-name">{ artistName }</p>
      </div>
    );
  }
}

ListAlbum.propTypes = ({
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
});
