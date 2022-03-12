import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDDrRgZOZO-g3WJTFJcB__NkDiILFjUBhE",
    authDomain: "funtasktic-beef8.firebaseapp.com",
    projectId: "funtasktic-beef8",
    storageBucket: "funtasktic-beef8.appspot.com",
    messagingSenderId: "831325330209",
    appId: "1:831325330209:web:60c2e3418a8a769aebfc60",
    measurementId: "G-PT7R1TLM2G"
  };

const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp