import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    piKey: "AIzaSyDYIrkbX8mbnmolDo6ayqIa-XGSpEdClVo",
    authDomain: "todo-app-a39c6.firebaseapp.com",
    databaseURL: "https://todo-app-a39c6.firebaseio.com",
    projectId: "todo-app-a39c6",
    storageBucket: "todo-app-a39c6.appspot.com",
    messagingSenderId: "205072934903",
    appId: "1:205072934903:web:6e89dbcc5ea9177b0f30f2",
    measurementId: "G-BEMGEPVHBJ"
});


const db = firebaseApp.firestore();

export default db;
