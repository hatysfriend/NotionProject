import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {firebase} from '@firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAV_cUgZBOlmuXSkFQWF3oPcQVR9XWMBzg",
  authDomain: "notionapp-3338e.firebaseapp.com",
  projectId: "notionapp-3338e",
  storageBucket: "notionapp-3338e.appspot.com",
  messagingSenderId: "690163186622",
  appId: "1:690163186622:web:59f6d88369dd5acb4b57ef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

