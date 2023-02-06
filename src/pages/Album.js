import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    albumList: [],
  };

  async componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const { match: { params } } = this.props;
    const songs = await getMusics(params.id);

    this.setState({
      albumList: songs.filter((song, index) => index !== 0),
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
    });
  };

  render() {
    const { albumList, artistName, albumName } = this.state;

    return (
      <div data-testid="page-album">
        Album
        <Header />

        <section>
          <h2 data-testid="album-name">{albumName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
        </section>

        <section>
          {
            albumList.map((song, index) => (
              <div key={ index }>
                <MusicCard
                  name={ song.artistName }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                />
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
