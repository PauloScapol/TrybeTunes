import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import User from './User';
import '../styles/Header.css';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.userLogin();
  }

  userLogin = async () => {
    const { name } = await getUser();

    this.setState({
      loading: false,
      userName: name,
    });
  };

  render() {
    const { userName, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <div className="headerTop">
          <h1 className="headerTitle">Trybe Tunes</h1>
          <ul className="headerNav">
            <li>
              <Link
                className="link"
                to="/search"
                data-testid="link-to-search"
              >
                Search 🔍
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites ⭐
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile 👤
              </Link>
            </li>
          </ul>
          <User name={ userName } />
        </div>
      </header>
    );
  }
}

export default Header;
