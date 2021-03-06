import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HURL, inputControl, setCurrentLocation, setUserId } from '../actions/index';

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    errors: ''
  }

  logIn = (e) => {
    e.preventDefault();
    if (this.state.username && this.state.password){
      fetch(HURL() + '/sessions', {
        method: 'POST',
        body: JSON.stringify({username: this.state.username, password: this.state.password}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => res.json() )
      .then( response => {  
        if (response.errors || response.error){
          this.setState({
            errors: response.errors
          });
        }else{
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('token', response.token);
          this.props.dispatch(setUserId(response.user.id));
          window.history.pushState({}, "new state", "/");
          this.props.dispatch(setCurrentLocation('/'));
        }
      });
    }else{
      this.setState({
        errors: 'Missing username or password.'
      });
    }
  };

  render() {
    return (
      <div className='formContainer'>
        <form onSubmit={this.logIn}>
          <h1 className='light'>{this.props.userId} Sign In Below:</h1>
          {this.state.errors ? <React.Fragment>
            <span className='error-message'>{this.state.errors}</span>
            <div className='divider spacer'></div>
              <div className='divider spacer'></div>
          </React.Fragment> : null }
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={inputControl.bind(this)} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={inputControl.bind(this)} />
          <input type='submit' className='submit'/>
        </form>
        <Link exact='true' to='/sign-up' onClick={() => this.props.dispatch(setCurrentLocation('/sign-up'))} >Don't have an account? Sign up ></Link>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(SignIn);