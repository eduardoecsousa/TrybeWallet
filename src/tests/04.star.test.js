import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import {
  renderWithRouterAndRedux,
} from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o botão de salvar despesas', () => {
  test('Verifica se existe um botão com o texto "Adicionar despesa"', () => {
    renderWithRouterAndRedux(<Wallet />);
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(buttonAdd).toBeInTheDocument();
  });
  test('Testa se ao clicar no botão é feita uma requisição na API e é salvo os dados e limpado os inputs', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    const object = {
      id: 0,
      value: '012',
      description: 'Roupas',
      currency: 'CAD',
      method: 'Cartão de crédito',
      tag: 'Trabalho',
      exchangeRates: mockData,
    };
    const { store } = renderWithRouterAndRedux(<Wallet />);
    const valueTotal = screen.getByTestId('total-field');
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    const optionCurr = await screen.findByRole('option', { name: 'CAD' });
    const optionMethod = await screen.findByRole('option', { name: 'Cartão de crédito' });
    const optionTag = await screen.findByRole('option', { name: 'Trabalho' });

    userEvent.type(inputValue, '12');
    userEvent.type(inputDescription, 'Roupas');
    userEvent.selectOptions(inputCurrency, optionCurr);
    userEvent.selectOptions(inputMethod, optionMethod);
    userEvent.selectOptions(inputTag, optionTag);
    userEvent.click(buttonAdd);

    // Verifica se os campos são limpados ao clicar no botão;
    expect(inputValue).toHaveValue('');
    expect(inputDescription).toHaveValue('');
    await waitFor(() => expect(store.getState().wallet.expenses).toEqual([object]));
    expect(screen.getByText(/roupas/i)).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /trabalho/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByText(/12\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/dólar canadense\/real brasileiro/i)).toBeInTheDocument();
    expect(screen.getByText(/3\.76/i)).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /45\.07/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();
    expect(valueTotal).toHaveTextContent(45.07);
  });
});
