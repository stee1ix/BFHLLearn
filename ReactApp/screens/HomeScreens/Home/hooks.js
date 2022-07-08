import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../../../../firebase.config';

export const useFirstname = async () => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.firstname;
  } else {
    console.log('No such user found!');
    return '';
  }
};
