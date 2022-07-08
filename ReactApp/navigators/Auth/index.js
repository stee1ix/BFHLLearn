import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/AuthScreens/Login';
import SignupScreen from '../../screens/AuthScreens/Signup';
import HomeScreen from '../../screens/HomeScreens/Home';
import {Button} from 'react-native-paper';
import {handleLogoutButton, useAuthListener} from './hooks';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({route}) {
  const {
    params: {loggedIn: initLoggedIn},
  } = route;

  const [loggedIn] = useAuthListener();

  const renderAuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  };

  const renderHomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerRight: () => (
              <Button onPress={handleLogoutButton}>LOGOUT</Button>
            ),
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    );
  };

  if (loggedIn !== null) {
    return !loggedIn ? renderAuthStack() : renderHomeStack();
  } else {
    return !initLoggedIn ? renderAuthStack() : renderHomeStack();
  }
}
