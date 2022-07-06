import React, {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/Login';
import SignupScreen from '../screens/AuthScreens/Signup';
import HomeScreen from '../screens/HomeScreens/Home';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../firebase.config';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
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

  return !loggedIn ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
