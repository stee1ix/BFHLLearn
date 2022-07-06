import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    marginVertical: 24,
  },
  error: {
    color: Colors.red900,
  },
  textInput: {
    marginVertical: 8,
  },
  btn: {
    marginVertical: 8,
  },
  signUpMsgWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  signUpNavBtn: {
    color: Colors.deepPurple900,
  },
});
