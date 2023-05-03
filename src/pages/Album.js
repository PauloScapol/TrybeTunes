import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../styles/Album.css';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    albumList: [],
    favoriteSongs: [],
    loading: false,
  };

  async componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const { match: { params } } = this.props;
    const songs = await getMusics(params.id);
    const savedFavorites = await getFavoriteSongs();

    this.setState({
      albumList: songs.filter((song, index) => index !== 0),
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
      favoriteSongs: savedFavorites,
    });
  };

  isChecked = (value) => {
    const { favoriteSongs } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      if (favoriteSongs.some((song) => song.trackId === value.trackId)) {
        await removeSong(value);
      } else {
        await addSong(value);
      }
      const favorites = await getFavoriteSongs();

      this.setState({
        loading: false,
        favoriteSongs: favorites,
      });
    });
  };

  render() {
    const { albumList, artistName, albumName, loading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        Album

        {
          loading ? <Loading /> : (
            <>
              <section className="albumArtist">
                <h2 data-testid="album-name">{albumName}</h2>
                <h3 data-testid="artist-name">{artistName}</h3>
              </section>

              <section className="albumList">
                {
                  albumList.map((song, index) => (
                    <div className="song" key={ index }>
                      <MusicCard
                        trackId={ song.trackId }
                        trackName={ song.trackName }
                        previewUrl={ song.previewUrl }
                        song={ song }
                        checked={ favoriteSongs.some((music) => (
                          music.trackId === song.trackId
                        )) }
                        isChecked={ () => { this.isChecked(song); } }
                      />
                    </div>
                  ))
                }
              </section>
            </>
          )
        }
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
