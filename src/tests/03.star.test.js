import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import {
  renderWithRouterAndRedux,
} from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o Formulario', () => {
  afterEach(() => jest.clearAllMocks());
  test('Verifica se os elementos estão na pagina e com o "data-testid" correto', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });
  test('Verifica se a aplicação faz uma requisição para API e o estado global recebe um array', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />);
    const endPointApi = 'https://economia.awesomeapi.com.br/json/all';

    expect(fetch).toHaveBeenCalledWith(endPointApi);
    expect(fetch).toHaveBeenCalled();
  });

  test('Verifica o se o estado global possui um array com todos as moedas ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const value = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
    const { store } = renderWithRouterAndRedux(<Wallet />);
    await waitFor(() => expect(store.getState().wallet.currencies).toEqual(value));
  });
  test('Verifica as opções de metodo e categoria', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');

    userEvent.selectOptions(inputMethod, 'Cartão de crédito');
    userEvent.selectOptions(inputTag, 'Transporte');

    expect(inputMethod).toHaveValue('Cartão de crédito');
    expect(inputTag).toHaveValue('Transporte');
  });
});
