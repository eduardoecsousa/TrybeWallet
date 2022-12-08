import { ENTER_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
export { ENTER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENTER_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
