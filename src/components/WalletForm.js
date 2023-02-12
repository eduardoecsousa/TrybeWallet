import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, receiveDateExpense, editExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      updated: false,
    };
  }

  componentDidUpdate() {
    const { editor, expenseToEdit } = this.props;
    const { updated } = this.state;
    if (editor && !updated) {
      this.setState({
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
        updated: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClickAdd = async () => {
    const { id, dispatch, coins } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    const objExpense = { value, description, currency, method, tag };
    dispatch(fetchCurrency());
    const objdateExpece = { id,
      ...objExpense,
      exchangeRates: coins,
    };
    dispatch(receiveDateExpense(objdateExpece));
    // }
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  };

  handleClickEdit = () => {
    const { idToEdit, dispatch, coins, expenses } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    const objExpense = { value, description, currency, method, tag };
    dispatch(fetchCurrency());
    const objdateExpece = { id: idToEdit,
      ...objExpense,
      exchangeRates: coins,
    };
    const newExpense = expenses.map((e) => (e.id === idToEdit ? objdateExpece : e));
    dispatch(editExpense(newExpense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    }, () => {
      this.setState({ updated: false });
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="expense">
          Valor
          <input
            data-testid="value-input"
            type="text"
            id="expense"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {editor ? (
          <button
            onClick={ this.handleClickEdit }
            type="button"
          >
            Editar despesas
          </button>)
          : (
            <button
              onClick={ this.handleClickAdd }
              type="button"
            >
              Adicionar despesa
            </button>
          ) }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  id: state.wallet.id,
  coins: state.wallet.coins,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenseToEdit: state.wallet.expenseToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  coins: PropTypes.shape({}).isRequired,
  editor: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
