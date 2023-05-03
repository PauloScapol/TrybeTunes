import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: true,
    canSubmit: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateForm());
  };

  validateEmail = (email) => {
    // Regex para validar o formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validateForm = () => {
    const { name, email } = this.state;
    const isEmailValid = this.validateEmail(email);
    const canSubmit = name.trim() !== '' && isEmailValid;
    this.setState({ canSubmit });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    const updatedUser = {
      name,
      email,
      description,
      image,
    };
    this.setState({ loading: true });

    await updateUser(updatedUser);
    this.setState({ loading: false }, () => history.push('/profile'));
  };

  render() {
    const { name, email, description, image, loading, canSubmit } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        Profile Edit
        <div className="profile-container">
          <h1>Editar Perfil</h1>
          <form className="profile-form" onSubmit={ this.handleSubmit }>
            <label htmlFor="image">
              Foto de Perfil:
              <input
                className="profile-image"
                type="url"
                id="image"
                name="image"
                value={ image }
                onChange={ this.handleInputChange }
                data-testid="edit-input-image"
              />
            </label>

            <label htmlFor="name">
              Nome:
              <input
                className="profile-name"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleInputChange }
                data-testid="edit-input-name"
              />
            </label>

            <label htmlFor="email">
              Email:
              <input
                className="profile-email"
                type="email"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleInputChange }
                data-testid="edit-input-email"
              />
            </label>

            <label htmlFor="description">
              Descrição:
              <textarea
                className="profile-description"
                id="description"
                name="description"
                value={ description }
                onChange={ this.handleInputChange }
                data-testid="edit-input-description"
              />
            </label>

            <button
              type="submit"
              disabled={ !canSubmit }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
