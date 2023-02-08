import React from 'react';
import PropTypes from 'prop-types';

class User extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <h3 data-testid="header-user-name">{ name }</h3>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
