import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderWithRouterAndRedux,
} from './helpers/renderWith';
import App from '../App';

const idHtml = 'password-input';

describe('0 - Testa a pagina de login', () => {
  test('Verifica se a rota esta correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se é renderizado elementos para o usuairo inserir email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(idHtml);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  test('Verifica se é rederizado um "button" com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeInTheDocument();
  });
  describe('Verifica se as valição devidas foram realizadas', () => {
    test('Verifica se mesmo com o a senha valida o botão não é habilitado', () => {
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByRole('textbox');
      const inputPassword = screen.getByTestId(idHtml);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });

      userEvent.type(inputEmail, '@login.invalido');
      userEvent.type(inputPassword, '123456');

      expect(button.disabled).toBe(true);
    });
    test('Verifica se mesmo com o email valido o botão não é habilitado', () => {
      const email = 'dudu@gmail.com';
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByRole('textbox');
      const inputPassword = screen.getByTestId(idHtml);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });
      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, '12345');

      expect(button.disabled).toBe(true);
    });
    test('Verifica se com email e senha validos o botão é habilitado', () => {
      const email = 'satu@gmail.com';
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByRole('textbox');
      const inputPassword = screen.getByTestId(idHtml);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });

      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, '123456');

      expect(button.disabled).toBe(false);
    });
  });
  test('Verifica se o email é salvo no estado global', () => {
    const email = 'oliva@gmail.com';
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(idHtml);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const storeGlobal = store.getState();
    expect(storeGlobal.user.email).toBe(email);
  });
  test('Verifica a apos clicar no button a rota é derecionada para "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(idHtml);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail, 'dudu@gmail.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
