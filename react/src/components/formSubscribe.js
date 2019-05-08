import React from 'react';
import ReactDOM from 'react-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import request from 'Utils/request';
import moment from 'moment';
import { setJwtCookie } from 'Utils/jwtCookie';
const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
import config from '~/config.js';

const placeholder = {
  init : {
    placeholderUsername: 'Only alpha-numeric characters comma and space',
    placeholderEmail: 'Your email will always be kept secret'
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
      sexe: null,
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
          placeholderUsername: userInput + ' is already taken...'
        });
        break;
      case 'email':
        this.setState({
          placeholderEmail: userInput + ' is already taken...'
        });
        break;
      default:
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, sexe, birthday, email, password } = this.state;
    const postObj = {
      birthday: moment(birthday, 'DD/MM/YYYY').toDate(),
      username,
      sexe,
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
      <form onSubmit={this.handleSubmit}>
        <legend>
          Username*
        </legend>
        <input
          type="text"
          ref="username"
          value={username}
          placeholder={placeholderUsername}
          alt="ton titre" title="ton titre"
          onChange={e => this.changeValue(e, 'username')}
        />
        <legend>
          Email*
        </legend>
        <input
          type="email"
          ref="email"
          value={email}
          placeholder={placeholderEmail}
          onChange={e => this.changeValue(e, 'email')}
        />
        <div className="row">
          <div className="columns four">
            <legend>
              Sexe*
            </legend>
            <select
              className="u-full-width"
              ref="sexe"
              onChange={e => this.changeValue(e, 'sexe')}
            >
              <option value="">--</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="columns eight">
            <legend>
              Birthday*
            </legend>
            <input
              type="text"
              ref="birthday"
              value={birthday}
              placeholder="dd/mm/yyyy"
              onChange={e => this.changeValue(e, 'birthday')}
            />
          </div>
        </div>
        <legend>
          Password*
        </legend>
        <input
          type={showPassword ? 'text' : 'password'}
          ref="password"
          placeholder="Minimum eight characters, one capital, one number"
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
        <input
          className="button-primary"
          type="submit"
          value="Submit"
          style={{marginTop: 10}}
        />
      </form>
    </div>;
  }
}
