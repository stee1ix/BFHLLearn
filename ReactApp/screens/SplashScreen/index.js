import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {useAuthListener} from './hooks';

export default function SplashScreen({navigation}) {
  const [loggedIn] = useAuthListener();

  const renderLottieAnimation = () => {
    return (
      <LottieView
        source={require('../../assets/splash.json')}
        resizeMode="center"
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          navigation.replace('AuthNavigator', {loggedIn});
        }}
      />
    );
  };

  return <View style={styles.container}>{renderLottieAnimation()}</View>;
}
