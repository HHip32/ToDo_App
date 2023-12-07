import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './Home';
import AddJob from './AddJob';
import EditJob from './EditJob';







const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: true, title: '' }} />
          <Stack.Screen name="EditJob" component={EditJob} options={{ headerShown: true, title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
