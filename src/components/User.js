import React from 'react';
import PropTypes from 'prop-types';

class User extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <span data-testid="header-user-name">{ name }</span>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
