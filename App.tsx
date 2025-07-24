/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgetPassword from './src/screens/ForgetPassword';
import CreateNewPassword from './src/screens/CreateNewPassword';
import OnBoarding from './src/screens/OnBoarding';
import NewNote from './src/screens/NewNote';
import OnBoardingNew from './src/screens/OnBoardingNew';
import Tabs from './src/navigation/Tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ChangePassword from './src/screens/ChangePassword';
import EditProfile from './src/screens/EditProfile';
import SplashScreen from './src/screens/SplashScreen';
import {StoreInternalDataProvider} from './src/context/StoreInternalData';
import {AuthContextProvider} from './src/context/AuthContext';
import Navigator from './src/navigation/Navigator';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  

   return (
  //   <View style={styles.container}>
  //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //     <NewAppScreen templateFileName="App.tsx" />
  //   </View>
  
<PaperProvider>
  <AuthContextProvider>  
  <StoreInternalDataProvider>
  <NavigationContainer>
  <Navigator/>
  <Toast/>
  </NavigationContainer>
  </StoreInternalDataProvider>
  </AuthContextProvider>
</PaperProvider>

);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
