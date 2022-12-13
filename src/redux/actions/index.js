// Coloque aqui suas actions
export const ENTER_EMAIL = 'ENTER_EMAIL';
export const RECEIVE_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_DATE_EXPENSE = 'RECEIVE_DATE_EXPENSE';
export const SUM_VALUE_TOTAL = 'SUM_VALUE_TOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_EDIT_EXPENSE = 'REQUEST_EDIT_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const actionEntreEmail = (email) => ({
  type: ENTER_EMAIL,
  email,
});

export const receiveCurrency = (currency, json) => ({
  type: RECEIVE_CURRENCY,
  currency,
  json,
});

export const receiveDateExpense = (dateExpense) => ({
  type: RECEIVE_DATE_EXPENSE,
  dateExpense,
});

export const sumValueTotal = (value) => ({
  type: SUM_VALUE_TOTAL,
  value,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const requestEditExpense = (id, expense) => ({
  type: REQUEST_EDIT_EXPENSE,
  id,
  expense,
});

export const editExpense = (newExpense) => ({
  type: EDIT_EXPENSE,
  newExpense,
});

export function fetchCurrency() {
  return async (dispatch) => {
    try {
      const requesAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await requesAPI.json();
      const arrayCurrency = Object.keys(json);
      const currency = arrayCurrency.filter((e) => e !== 'USDT');
      return dispatch(receiveCurrency(currency, json));
    } catch (erro) {
      console.log(erro);
    }
  };
}
