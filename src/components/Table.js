import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, requestEditExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleClickEdit = (id, expense) => {
    const { dispatch } = this.props;
    dispatch(requestEditExpense(id, expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(expense.value * 1).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {
                    (expense.exchangeRates[expense.currency].ask * 1)
                      .toFixed(2)
                  }
                </td>
                <td>
                  {
                    (expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.handleClickDelete(expense.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickEdit(expense.id, expense) }
                    data-testid="edit-btn"
                  >
                    Editar despesa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
