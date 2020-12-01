import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
    apiKey: "AIzaSyCLxJ1TCTBcYLzAalH1jojTyp8TjB3DMsQ",
    authDomain: "fir-desafio-c0055.firebaseapp.com",
    databaseURL: "https://fir-desafio-c0055.firebaseio.com",
    projectId: "fir-desafio-c0055",
    storageBucket: "fir-desafio-c0055.appspot.com",
    messagingSenderId: "479327997294",
    appId: "1:479327997294:web:0ac79a455e432d6fe7c57f"
  };

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;