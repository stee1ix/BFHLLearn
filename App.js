import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigator from './ReactApp/navigators/Main';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <MainNavigator />
        </View>
      </QueryClientProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
