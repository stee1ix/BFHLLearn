import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {auth, db} from '../../../../firebase.config';
import {doc, getDoc} from 'firebase/firestore';

export default function HomeScreen({navigation}) {
  const getUsername = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      navigation.setOptions({
        headerTitle: `Hi! ${data.firstname}`,
      });
    } else {
      console.log('No such user found!');
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return <SafeAreaView></SafeAreaView>;
}
