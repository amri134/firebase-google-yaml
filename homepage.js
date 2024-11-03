import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyA8VvXw710toyzNQ-prNycI5OhPh3bm8YI",
    authDomain: "byetrash.firebaseapp.com",
    projectId: "byetrash",
    storageBucket: "byetrash.firebasestorage.app",
    messagingSenderId: "875231949079",
    appId: "1:875231949079:web:505c1630d3bdb4ebf10752",
    measurementId: "G-58NKS6S5T5"
  };
 
  //c370b4ky1685@bangkit.academy Hajijin Amri
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user) => {
    if (user) {
        if (!user.emailVerified) {
            console.log("Email not verified");
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Error Signing out:', error);
            });
            return;
        }
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            console.log(user);
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById('loggedUserFName').innerText = userData.firstName;
                        document.getElementById('loggedUserEmail').innerText = userData.email;
                        document.getElementById('loggedUserLName').innerText = userData.lastName;
                    } else {
                        console.log("no document found matching id");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document");
                });
        } else {
            console.log("User Id not Found in Local storage");
        }
    }
});

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })