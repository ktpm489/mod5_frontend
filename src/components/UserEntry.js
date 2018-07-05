import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';

class UserEntry extends React.Component {

  createUser = (e) => {
    console.log('create user');
  }

  render() {
    return (
      <div id='entryFormContainer'>
      <div id='entry-logo'></div>
        <div id='formInnerContainer'>
          <SignUp handleOnSubmit={this.createUser} />
          <SignIn/>
        </div>
      </div>
    );
  };
};

export default connect()(UserEntry);