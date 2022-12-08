// Coloque aqui suas actions
export const ENTER_EMAIL = 'ENTER_EMAIL';
export const RECEIVE_CURRENCY = 'REQUEST_CURRENCY';

export const actionEntreEmail = (email) => ({
  type: ENTER_EMAIL,
  email,
});

export const receiveCurrency = (currency) => ({
  type: RECEIVE_CURRENCY,
  currency,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const requesAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await requesAPI.json();
    const arrayCurrency = Object.keys(json);
    const currency = arrayCurrency.filter((e) => e !== 'USDT');
    return dispatch(receiveCurrency(currency));
  };
}
