import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormLogin from '../components/FormLogin';
import Button from '../components/Button';
import { actionEntreEmail } from '../redux/actions';
import title from '../Img/Title.jpeg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: true,
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const NUM = 6;
      const { email, password } = this.state;
      const validaEmail = /\S+@\S+\.\S+/;
      const validations = [validaEmail.test(email), password.length >= NUM];
      const checks = validations.every((e) => e === true);
      if (checks) {
        this.setState({
          disable: false,
        });
      } else {
        this.setState({
          disable: true,
        });
      }
    });
  };

  changeClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(actionEntreEmail(email));
    this.setState({ redirect: true });
  };

  render() {
    const { email, password, disable, redirect } = this.state;
    return (
      <div className="container-login">
        <div className="container-form">
          <img src={ title } alt="EmojiMoney" className="title" />
          <FormLogin
            email={ email }
            password={ password }
            onChange={ this.handleChange }
          />
          <Button disable={ disable } onClick={ this.changeClick } />
          {redirect && <Redirect to="/carteira" />}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
