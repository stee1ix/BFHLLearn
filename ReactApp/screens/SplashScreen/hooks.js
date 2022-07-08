import {onAuthStateChanged} from 'firebase/auth';
import {useEffect, useRef, useState} from 'react';
import {auth} from '../../../firebase.config';

export const useAuthListener = () => {
  const unsubscribe = useRef();

  const [loggedIn, setLoggedIn] = useState(false);

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
