import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends React.Component {
  state = {
    user: null,
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          Profile
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <img src={ user.image } alt="Profile" data-testid="profile-image" />
          <Link to="/profile/edit" className="editar-perfil">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
