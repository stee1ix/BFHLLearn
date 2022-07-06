import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTT-Q9Ty4h8rks3qHqi37qqiozY5AxN0E',
  authDomain: 'bfhllearn.firebaseapp.com',
  projectId: 'bfhllearn',
  storageBucket: 'bfhllearn.appspot.com',
  messagingSenderId: '559325624717',
  appId: '1:559325624717:web:1d68ae2a04080f664ae5c4',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
