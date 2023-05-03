import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, checked, isChecked, song } = this.props;

    return (
      <div>
        <h3 className="songName">{trackName}</h3>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <form>
          <label htmlFor="favorite">
            Favorite
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              value={ song }
              onChange={ isChecked }
              checked={ checked }
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.elementType,
  trackId: PropTypes.number,
  song: PropTypes.objectOf(PropTypes.string),
  checked: PropTypes.bool,
  isChecked: PropTypes.func,
}.isRequired;

export default MusicCard;
