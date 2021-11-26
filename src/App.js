// React core
import React, { Component } from 'react';
// Firebase.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
import './App.css'; // This uses CSS modules.

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiTRY-9smSKgI8skOpT3njCwGK6Q14Uiw",
  authDomain: "fir-ui-web-react-14d01.firebaseapp.com",
  databaseURL: "https://fir-ui-web-react-14d01.firebaseio.com",
  projectId: "fir-ui-web-react-14d01",
  storageBucket: "fir-ui-web-react-14d01.appspot.com",
  messagingSenderId: "800963024343"
};

// Instantiate a Firebase app.
firebase.initializeApp(firebaseConfig);

class SignInScreen extends Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
   
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container">
          <h1>Kotakode</h1>
          <p>Masuk dengan:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div className="container">
        
        <h1>Berhasil</h1>
        <p>Selamat datang {firebase.auth().currentUser.displayName}! Anda telah login!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

export default SignInScreen;







