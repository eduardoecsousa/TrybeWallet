import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrency, sumValueTotal } from '../redux/actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  componentDidUpdate() {
    const { dispatch, expenses } = this.props;
    const valueTotal = expenses.reduce((acc, ele) => {
      acc += ele.value * ele.exchangeRates[ele.currency].ask;
      return acc;
    }, 0);

    dispatch(sumValueTotal(valueTotal));
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
