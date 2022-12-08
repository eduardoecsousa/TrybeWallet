import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { onClick, disable } = this.props;
    return (
      <div>
        <button
          type="submit"
          onClick={ onClick }
          disabled={ disable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Button;
