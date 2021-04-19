import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBKrrCd4vHE2ZSqBOnw-m-vwAkZ2fhb1Xo",
    authDomain: "crwn-db-10d82.firebaseapp.com",
    projectId: "crwn-db-10d82",
    storageBucket: "crwn-db-10d82.appspot.com",
    messagingSenderId: "978214719290",
    appId: "1:978214719290:web:abfcbd8ed25fc6d537ca03",
    measurementId: "G-8VGPEZYLRS"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
