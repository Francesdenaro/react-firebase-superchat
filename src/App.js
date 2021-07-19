import logo from './logo.svg';
import './App.css';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyDPGphDBs38UJtP5Vx6rlk3R3EOoiu8ZFs",
  authDomain: "superchat-56f76.firebaseapp.com",
  projectId: "superchat-56f76",
  storageBucket: "superchat-56f76.appspot.com",
  messagingSenderId: "563508821538",
  appId: "1:563508821538:web:c830c625090105f2f4147b",
  measurementId: "G-57X2YJ57VQ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
