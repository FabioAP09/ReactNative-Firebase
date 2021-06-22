import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAIIlWuO0Sa-a013s56I3V0C5Pp1J_u4wM",
    authDomain: "fir-64998.firebaseapp.com",
    databaseURL: "https://fir-64998.firebaseio.com",
    projectId: "fir-64998",
    storageBucket: "fir-64998.appspot.com",
    messagingSenderId: "222522956029",
    appId: "1:222522956029:web:d53f8cad36aeacacf54694"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
