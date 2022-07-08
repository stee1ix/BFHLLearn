import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../../screens/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from '../Auth';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const renderMainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      </Stack.Navigator>
    );
  };

  return <NavigationContainer>{renderMainStack()}</NavigationContainer>;
}
