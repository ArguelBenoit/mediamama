import React from 'react';
import FormLogin from 'Components/formLogin';
import FormSubscribe from 'Components/formSubscribe';
import background from 'Images/dating.jpg';
import 'Styles/login.less';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mode: 'login',
      animationStyle: {
        transitionDuration: '300ms',
        transform: 'translateY(0px)',
        opacity: 1
      }
    };
  }
  componentDidMount() {
    this.init();
    destroyJwtCookie();
  }
  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      destroyJwtCookie();
    }
  }
  init() {
    this.setState({
      animationStyle: {
        transitionDuration: '300ms',
        transform: 'translateY(0px)',
        opacity: 1
      }
    });
  }
  switchMode(event) {
    let {
      mode
    } = this.state;
    event.preventDefault();
    // sortie du formulaire
    this.setState({
      animationStyle: {
        transitionDuration: '300ms',
        transform: 'translateY(20px)',
        opacity: 0
      }
    });
    // repositionnement du formulaire avant arrivé
    setTimeout(() =>
      this.setState({
        mode: mode === 'login' ? 'subscribe' : 'login',
        animationStyle: {
          transitionDuration: '0ms',
          transform: 'translateY(-20px)',
          opacity: 0
        }
      })
    ,300);
    // repositionnement du formulaire
    setTimeout(
      () => this.setState({
        animationStyle: {
          transitionDuration: '300ms',
          transform: 'translateY(0px)',
          opacity: 1
        }
      })
    ,350);
  }
  render () {
    const { mode, animationStyle } = this.state;
    let propsContainerForm = {
      className: `container-form ${mode}`,
      style: animationStyle
    };
    return <div
      ref="container"
      className="container-page"
      style={{backgroundImage: `url('${background}')`}}
    >
      <div className="container-container-form">
        <div {...propsContainerForm}>
          {mode === 'login' ?
            <FormLogin /> :
              <FormSubscribe />
            }
            <a href="" onClick={e => this.switchMode(e)}>
              {'Switch to ' + ( mode === 'login' ? 'subscribe' : 'login')}
            </a>
        </div>
      </div>
    </div>;
  }
}

Login.propTypes = {
  path: PropTypes.string
};

export default Login;
