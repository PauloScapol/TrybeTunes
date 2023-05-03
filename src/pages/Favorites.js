import React from 'react';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const favoriteSongs = await getFavoriteSongs();

      this.setState({
        favoriteSongs,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleRemoveSong = async (songId) => {
    this.setState({ loading: true });

    try {
      await removeSong(songId);

      const favoriteSongs = await getFavoriteSongs();

      this.setState({
        favoriteSongs,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { favoriteSongs, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        <h1 className="title">Músicas favoritas</h1>
        {favoriteSongs.length === 0 ? (
          <p>Você ainda não tem músicas favoritas.</p>
        ) : (
          <ul className="albumList">
            {favoriteSongs.map((song) => (
              <li className="song" key={ song.id }>
                <MusicCard
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  song={ song }
                  onRemoveSong={ this.handleRemoveSong }
                  isFavorite
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Favorites;
