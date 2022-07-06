import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigator from './ReactApp/navigators/MainNavigator';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MainNavigator />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
