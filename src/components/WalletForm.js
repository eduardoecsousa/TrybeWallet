import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expense">
          <input
            data-testid="value-input"
            type="number"
            id="expense"
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            id="description"
          />
        </label>
        <label htmlFor="currency">
          <select data-testid="currency-input" id="currency">
            {currencies.map((e) => (
              <option key={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select data-testid="method-input" id="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select data-testid="tag-input" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
