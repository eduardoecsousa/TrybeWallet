import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { email, password, onChange } = this.props;
    return (
      <form>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ onChange }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ onChange }
          />
        </label>
      </form>
    );
  }
}

FormLogin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormLogin;
