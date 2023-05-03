import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/AlbumDisplay.css';

class AlbumDisplay extends React.Component {
  render() {
    const { albumImg, artistName, artistSearch, collectionId } = this.props;

    return (
      <div className="albumDisplay">
        <img src={ albumImg } alt={ artistSearch } />
        <h3>{ artistSearch }</h3>
        <h4>{ artistName }</h4>

        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Ver músicas
        </Link>
      </div>
    );
  }
}

AlbumDisplay.propTypes = {
  albumImg: PropTypes.string,
  artistName: PropTypes.string,
  artistSearch: PropTypes.string,
  collectionId: PropTypes.string,
}.isRequired;

export default AlbumDisplay;
