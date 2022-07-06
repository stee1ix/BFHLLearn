import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../../firebase.config';

export default function LoginScreen({navigation}) {
  const [userInputDetails, setUserInputDetails] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginButton = () => {
    const {email, password} = userInputDetails;

    // check empty fields
    if (email.trim() === '' || password.trim() === '') {
      setError('Enter all fields!');
      return;
    }

    setLoading(true);
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // signed in
        setLoading(false);
        console.log(userCredential.user.email);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
        console.error(err);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Email"
          value={userInputDetails.email}
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={email =>
            setUserInputDetails({...userInputDetails, email})
          }
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Password"
          value={userInputDetails.password}
          secureTextEntry={hidden}
          textContentType="password"
          onChangeText={password =>
            setUserInputDetails({...userInputDetails, password})
          }
          right={
            <TextInput.Icon
              name={hidden ? 'eye-off' : 'eye'}
              onPress={() => setHidden(value => !value)}
            />
          }
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Button
          style={styles.btn}
          mode="contained"
          onPress={handleLoginButton}
          loading={loading}>
          Login
        </Button>

        <View style={styles.signUpMsgWrapper}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signUpNavBtn}>{` Signup`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
