
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAespwTz2x171jNo77nv7HNzy4D_xqmnKs",
    authDomain: "bookland-ed2c4.firebaseapp.com",
    projectId: "bookland-ed2c4",
    storageBucket: "bookland-ed2c4.appspot.com",
    messagingSenderId: "583743657561",
    appId: "1:583743657561:web:f25c6fb76f2c979cf38348",
    measurementId: "G-8R93J4WL6S"
};



import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';




export {firebaseConfig,initializeApp,getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt};

