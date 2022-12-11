// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCY, RECEIVE_DATE_EXPENSE, SUM_VALUE_TOTAL, DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  valueTotal: 0,
  coins: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: [...action.currency],
      coins: { ...action.json },
    };
  case RECEIVE_DATE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.dateExpense],
      idToEdit: state.idToEdit + 1,
    };
  case SUM_VALUE_TOTAL:
    return {
      ...state,
      valueTotal: action.value,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
