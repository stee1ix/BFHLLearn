import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import LottieView from 'lottie-react-native';

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splash.json')}
        resizeMode="center"
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          navigation.replace('AuthNavigator');
        }}
      />
    </View>
  );
}
