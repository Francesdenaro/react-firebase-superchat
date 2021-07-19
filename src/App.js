import React, {useState, useRef} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import './App.css';

if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyDPGphDBs38UJtP5Vx6rlk3R3EOoiu8ZFs",
  authDomain: "superchat-56f76.firebaseapp.com",
  projectId: "superchat-56f76",
  storageBucket: "superchat-56f76.appspot.com",
  messagingSenderId: "563508821538",
  appId: "1:563508821538:web:c830c625090105f2f4147b",
  measurementId: "G-57X2YJ57VQ"
})
}

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}
const SignIn = () => {
  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  return (
      <div>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
      </div>
  );
}

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

const ChatRoom = () => {

  const dummy = useRef()

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({behaviour : 'smooth'});
  }

  return (
    <>
      <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={dummy}></div>

      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => {setFormValue(e.target.value)}}/>
        <button type="submit">🕊️</button>
      </form>
    </>
  );
}

const ChatMessage = (props) => {
  const {text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );

}

export default App;
