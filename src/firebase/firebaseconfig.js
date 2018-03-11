import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBeGAD-Uip251zWj5JudjJZIWCplOeUe1c",
    authDomain: "freelancer-react-project.firebaseapp.com",
    databaseURL: "https://freelancer-react-project.firebaseio.com",
    projectId: "freelancer-react-project",
    storageBucket: "",
    messagingSenderId: "725599317262"
};


const app = firebase.initializeApp(config);
export { app }