import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    searchBtn: true,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const { artist } = this.state;

    this.setState({
      artist: value,
      searchBtn: (artist.length < 1),
    });
  };

  render() {
    const { artist, searchBtn } = this.state;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <label htmlFor="search-artist">
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
            data-testid="search-artist-button"
            disabled={ searchBtn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
