import React from 'react';
import AlbumDisplay from '../components/AlbumDisplay';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searcAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    albums: [],
    loading: false,
    artistSearch: '',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  buttonClicked = async () => {
    const { artist } = this.state;

    this.setState({
      loading: true,
      artistSearch: artist,
    }, async () => {
      const artistId = await searcAlbumsAPI(artist);

      this.setState({
        albums: artistId,
        loading: false,
        artist: '',
      });
    });
  };

  render() {
    const { artist, albums, loading, artistSearch } = this.state;
    const minArtistLength = 2;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form className="searchPage">
          <label htmlFor="artist">
            <input
              type="text"
              placeholder="Nome do Artista"
              name="artist"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            className="button"
            data-testid="search-artist-button"
            disabled={ artist.length < minArtistLength }
            onClick={ this.buttonClicked }
          >
            Pesquisar
          </button>
        </form>

        {
          (albums.length) !== 0
            ? (
              <div className="albumsSearchContainer">
                <span>
                  {' '}
                  { `Resultado de álbuns de: ${artistSearch}` }
                </span>

                { albums.map((album) => (
                  <AlbumDisplay
                    key={ album.collectionId }
                    albumImg={ album.artworkUrl100 }
                    artistSearch={ album.collectionName }
                    artistName={ album.artistName }
                    collectionId={ album.collectionId }
                  />
                ))}
              </div>)
            : <h2>Nenhum álbum foi encontrado</h2>
        }
      </div>
    );
  }
}

export default Search;
