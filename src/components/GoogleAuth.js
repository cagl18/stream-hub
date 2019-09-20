import React, { Component } from 'react';
import actions from './actions';
import { connect } from 'react-redux';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '600879074152-2sttqbvrb7oha8ls77pechscnm7nlhq6.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(err => console.log('error: ', err));
    });
  }

  onAuthChange = isSignedIn => {
    // console.log('onAuthChange was triggered');
    if (isSignedIn) {
      // console.log(this.auth.currentUser.get().getId());
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    // console.log('SignIn btn was clicked');
    this.auth.signIn();
  };

  onSignOutClick = () => {
    // console.log('SignOut btn was clicked');
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' /> Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' /> Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: userId => dispatch(actions.signIn(userId)),
    signOut: () => dispatch(actions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
