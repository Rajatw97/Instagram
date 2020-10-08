import firebase from 'firebase';


const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBfoc4_CJLhRaKZlcXHVDFpIMzNFLxz05M",
    authDomain: "instagram-react-d38df.firebaseapp.com",
    databaseURL: "https://instagram-react-d38df.firebaseio.com",
    projectId: "instagram-react-d38df",
    storageBucket: "instagram-react-d38df.appspot.com",
    messagingSenderId: "286456338840",
    appId: "1:286456338840:web:0a3055e2ceacad71ac73ed",
    measurementId: "G-C3HGQW2VEC"
});

const db=firebase.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};

  