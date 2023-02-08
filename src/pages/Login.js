import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  buttonClicked = async () => {
    const { name } = this.state;
    const { history: { push } } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });
    this.setState({
      loading: false,
    }, () => push('/search'));
  };

  render() {
    const { name, loading } = this.state;
    const minNameLength = 3;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form className="loginPage">
          <label htmlFor="login-name">
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={ name }
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            data-testid="login-submit-button"
            disabled={ name.length < minNameLength }
            onClick={ this.buttonClicked }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
