// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCY,
  RECEIVE_DATE_EXPENSE,
  SUM_VALUE_TOTAL, DELETE_EXPENSE, REQUEST_EDIT_EXPENSE, EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expenseToEdit: {},
  id: 0,
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
      id: state.id + 1,
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
  case REQUEST_EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      expenseToEdit: action.expense,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...action.newExpense],
      editor: false,
      expenseToEdit: {},
    };
  default:
    return state;
  }
};

export default wallet;
