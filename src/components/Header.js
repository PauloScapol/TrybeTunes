import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import User from './User';

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

    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading /> : <User name={ userName } />
        }
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
