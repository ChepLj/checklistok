// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAluf6R38FXB7MgCXsqlXNZNxsNpINiBEM',
    authDomain: 'chat-app-test-3ca3b.firebaseapp.com',
    projectId: 'chat-app-test-3ca3b',
    storageBucket: 'chat-app-test-3ca3b.appspot.com',
    messagingSenderId: '976099850998',
    appId: '1:976099850998:web:db0fbb392f62cd0f4c8ad7',
    measurementId: 'G-TMFRKGBHEG',
    databaseURL: 'https://chat-app-test-3ca3b-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const dbFT = getFirestore(app);
const dbRT = ref(getDatabase(app));
const providerFB = new FacebookAuthProvider();
const providerGG = new GoogleAuthProvider();

export { dbFT, auth, providerFB, providerGG, dbRT };
