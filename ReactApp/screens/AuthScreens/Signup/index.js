import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../../../firebase.config';
import {doc, setDoc} from 'firebase/firestore';

export default function SignupScreen({navigation}) {
  const [userInputDetails, setUserInputDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
  });

  const [modalDate, setModalDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);

  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignupButton = () => {
    const {firstname, lastname, email, password, dob} = userInputDetails;

    // check empty fields
    if (
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      dob === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      setError('Enter all fields!');
      return;
    }

    setLoading(true);
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // account created
        console.log(userCredential.user);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          firstname,
          lastname,
          dob: modalDate,
        });
        setLoading(false);
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
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="First Name"
          value={userInputDetails.firstname}
          textContentType="name"
          onChangeText={firstname =>
            setUserInputDetails({...userInputDetails, firstname})
          }
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Last Name"
          value={userInputDetails.lastname}
          textContentType="name"
          onChangeText={lastname =>
            setUserInputDetails({...userInputDetails, lastname})
          }
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Date of Birth"
          value={userInputDetails.dob}
          editable={false}
          right={
            <TextInput.Icon
              name="calendar"
              onPress={() => setOpenDateModal(true)}
            />
          }
        />
        <DatePicker
          modal
          mode="date"
          open={openDateModal}
          date={modalDate}
          onConfirm={date => {
            setOpenDateModal(false);
            setModalDate(date);
            setUserInputDetails({
              ...userInputDetails,
              dob: `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`,
            });
          }}
          onCancel={() => {
            setOpenDateModal(false);
          }}
        />
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
          onPress={handleSignupButton}
          loading={loading}>
          Signup
        </Button>
        <View style={styles.loginMsgWrapper}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginNavBtn}>{` Login`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
