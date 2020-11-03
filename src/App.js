import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';



firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    //firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      const signedUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedUser);
      console.log(displayName, photoURL, email );
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const handleSignedOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOut = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOut);
    })
  }

  return (
    <div className="App">
      {
        user.isSignedIn ?<button onClick={handleSignedOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>
        }

      {
        user.isSignedIn && 
        <div>
        <p>Welcome, {user.name}</p>
      <p>Your email: {user.email}</p>
      <img src={user.photo}/>
        </div>
      }
    </div>
  );
}

export default App;
