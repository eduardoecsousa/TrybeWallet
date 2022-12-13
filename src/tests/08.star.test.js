import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import {
  renderWithRouterAndRedux,
} from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const expense1 = {
  id: 0,
  value: '012',
  description: 'Roupas',
  currency: 'CAD',
  method: 'Cartão de crédito',
  tag: 'Trabalho',
  exchangeRates: mockData,
};

const expense2 = {
  id: 1,
  value: '024',
  description: 'Jogos',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  exchangeRates: mockData,
};

const valueCurrencie = [
  'USD',
  'CAD',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'EUR',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
  'DOGE',
];

const initialState = {
  wallet: {
    currencies: valueCurrencie,
    expenses: [expense1, expense2],
    editor: false,
    idToEdit: 0,
    expenseToEdit: {},
    id: 3,
    valueTotal: 0,
    coins: mockData,
  },
};

describe('Testa os botões de excluir e editar', () => {
  test('verifica se os botões exixtem Excluir e editar são renderizados', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const btnDelete = screen.getAllByTestId('delete-btn');
    const btnEdit = screen.getAllByTestId('edit-btn');

    expect(btnDelete[0]).toBeInTheDocument();
    expect(btnDelete[1]).toBeInTheDocument();
    expect(btnEdit[0]).toBeInTheDocument();
    expect(btnEdit[1]).toBeInTheDocument();
  });
  test('Verifica se os botões executão suas funções', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const btnDelete = screen.getAllByTestId('delete-btn');
    const btnEdit = screen.getAllByTestId('edit-btn');
    const valueTotal = screen.getByTestId('total-field');

    userEvent.click(btnDelete[1]);
    expect(btnDelete[1]).not.toBeInTheDocument();
    expect(valueTotal).toHaveTextContent(45.07);

    userEvent.click(btnEdit[0]);
    const inputValue = screen.getByTestId('value-input');
    const btnEditExpense = screen.getByRole('button', {
      name: /editar despesas/i,
    });
    expect(btnEditExpense).toBeInTheDocument();
    expect(inputValue).toHaveValue('012');

    userEvent.clear(inputValue);
    userEvent.type(inputValue, '24');

    userEvent.click(btnEditExpense);
    expect(inputValue).toHaveValue('');
    expect(valueTotal).toHaveTextContent(90.14);
  });
});
