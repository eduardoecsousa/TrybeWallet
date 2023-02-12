import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import title from '../Img/Title.jpeg';

class Header extends Component {
  render() {
    const { email, valueTotal } = this.props;
    const valeubonito = valueTotal.toLocaleString(
      'en-US',
      { minimumFractionDigits: 2, maximumFractionDigits: 2,
      },
    );
    return (
      <header>
        <img src={ title } alt="EmojiMoney" className="title" />
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          { valeubonito }
        </p>
        <span data-testid="header-currency-field">
          BRL
        </span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  valueTotal: state.wallet.valueTotal,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valueTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
