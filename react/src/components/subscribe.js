import React from 'react';
import ReactDOM from 'react-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import request from 'Utils/request';
import moment from 'moment';
import { setJwtCookie } from 'Utils/jwtCookie';
import 'Styles/login.less';
const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const placeholder = {
  init : {
    placeholderUsername: '(Only alpha-numeric characters comma and space)',
    placeholderEmail: '(Your email will always be kept secret)'
  }
};

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleBorderError = this.toggleBorderError.bind(this);
    this.togglePlaceholderError = this.togglePlaceholderError.bind(this);
    this.clearValueInput = this.clearValueInput.bind(this);
    this.state = {
      username: '',
      birthday: '',
      email: '',
      password: '',
      showPassword: false,
      colorPassword: '#d40000', // red
      placeholderUsername: placeholder.init.placeholderUsername,
      placeholderEmail: placeholder.init.placeholderEmail
    };
  }
  changeValue(event, name) {
    let { value } = event.target;
    this.setState({
      [name]: value
    });
    this.toggleBorderError(name, false);
    switch (name) {
      case 'username':
        this.setState({placeholderUsername: placeholder.init.placeholderUsername});
        break;
      case 'email':
        this.setState({placeholderEmail: placeholder.init.placeholderEmail});
        break;
      case 'birthday':
        var str = value.replace(' ', '/').replace('.', '/').replace('-', '/');
        this.setState({birthday: str});
        break;
      case 'password':
        this.setState({colorPassword: regexPassword.test(value) ? '#007c00' : '#d40000'});
        break;
      default:
    }
  }
  toggleBorderError(ref, bool) {
    if (bool) {
      ReactDOM
        .findDOMNode(this.refs[ref])
        .classList
        .add('u-border-error');
    } else {
      ReactDOM
        .findDOMNode(this.refs[ref])
        .classList
        .remove('u-border-error');
    }
  }
  clearValueInput(ref) {
    this.setState({[ref]: ''});
  }
  togglePlaceholderError(ref) {
    let userInput = this.state[ref];
    switch (ref) {
      case 'username':
        this.setState({
          placeholderUsername: `(${userInput} is already taken...)`
        });
        break;
      case 'email':
        this.setState({
          placeholderEmail: `(${userInput} is already taken...)`
        });
        break;
      default:
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, birthday, email, password } = this.state;
    const postObj = {
      birthday: moment(birthday, 'DD/MM/YYYY').toDate(),
      username,
      email,
      password
    };
    Object.keys(postObj).forEach( key => {
      this.toggleBorderError(key, false);
    });
    request('post', '/api/users', postObj)
      .then(res => {
        setJwtCookie(res.data.id_token, '/dashboard');
      })
      .catch(err => {
        if (err.response &&
            err.response.data.message) {
          switch (err.response.data.message) {
            case 'Username taken':
              this.toggleBorderError('username', true);
              this.togglePlaceholderError('username');
              this.clearValueInput('username');
              break;
            case 'Email taken':
              this.toggleBorderError('email', true);
              this.togglePlaceholderError('email');
              this.clearValueInput('email');
              break;
            default:
          }
        }
        if (
          err.response &&
          err.response.data.validation &&
          err.response.data.validation.keys
        ) {
          err.response.data.validation.keys.forEach(key => {
              this.toggleBorderError(key, true);
              this.clearValueInput(key);
          });
        }
      });
  }
  render () {
    const {
      showPassword,
      birthday,
      placeholderEmail,
      placeholderUsername,
      email,
      username,
      password,
      colorPassword
    } = this.state;

    return <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="u-max-width-l">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
        </p>
        <form onSubmit={this.handleSubmit} className="u-max-width-m">

          <legend>
            Username*
          </legend>
          <input
            className="u-full-width"
            type="text"
            ref="username"
            value={username}
            onChange={e => this.changeValue(e, 'username')}
          />
          <p className="hint">
            {placeholderUsername}
          </p>

          <legend>
            Email*
          </legend>
          <input
            className="u-full-width"
            type="email"
            ref="email"
            value={email}
            onChange={e => this.changeValue(e, 'email')}
          />
          <p className="hint">
            {placeholderEmail}
          </p>

          <legend>
            Birthday*
          </legend>
          <input
            className="u-full-width"
            type="text"
            ref="birthday"
            value={birthday}
            onChange={e => this.changeValue(e, 'birthday')}
          />
          <p className="hint">
            (Example: 20/06/1899)
          </p>

          <legend>
            Password*
          </legend>
          <input
            className="u-full-width"
            type={showPassword ? 'text' : 'password'}
            ref="password"
            value={password}
            onChange={e => this.changeValue(e, 'password')}
            style={{color: colorPassword}}
          />
          {!showPassword ?
            <FaEyeSlash
              className="eye-icon"
              onClick={() => this.setState({showPassword: !showPassword})}
            /> :
            <FaEye
              className="eye-icon"
              onClick={() => this.setState({showPassword: !showPassword})}
            />
          }
          <p className="hint">
            (You should use minimum eight characters, one capital, one number)
          </p>

          <input
            className="button-primary u-full-width"
            type="submit"
            value="Submit"
            style={{marginTop: 10}}
          />

        </form>
      </div>
    </div>;
  }
}
