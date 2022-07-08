import {signOut, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../firebase.config';
import {useEffect, useRef, useState} from 'react';

export const handleLogoutButton = () => {
  signOut(auth)
    .then(() => {
      console.log('log out clicked');
    })
    .catch(err => {
      console.log(err);
    });
};

export const useAuthListener = () => {
  const unsubscribe = useRef();

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    unsubscribe.current = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('loggedin');
        setLoggedIn(true);
      } else {
        console.log('loggedout');
        setLoggedIn(false);
      }
    });

    return () => unsubscribe.current();
  }, []);

  return [loggedIn];
};
