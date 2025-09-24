/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthContextProvider } from './src/context/AuthContext';
import { StoreInternalDataProvider } from './src/context/StoreInternalData';
import NetflixHorizontalTitles from './src/screens/NetflixHorizontalTitles';
import SampleMapBoxScreen from './src/screens/SampleMapBoxScreen';
import SearchLocationScreen from './src/screens/SearchLocationScreen';
import SevenDaysWeatherScreen from './src/screens/SevenDaysWeatherScreen';
import SpecificLocationWeather from './src/screens/SpecificLocationWeather';
import TitleDetails from './src/screens/TitleDetails';
import WeatherAppHomeScreen from './src/screens/WeatherAppHomeScreen';
import WeatherSettings from './src/screens/WeatherSettings';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider>
      <AuthContextProvider>
        <StoreInternalDataProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="MapBoxScreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="WeatherHome"
                component={WeatherAppHomeScreen}
              />
              <Stack.Screen
                name="SevenDays"
                component={SevenDaysWeatherScreen}
              />
              <Stack.Screen
                name="SearchLocation"
                component={SearchLocationScreen}
              />
              <Stack.Screen
                name="WeatherSettingsScreen"
                component={WeatherSettings}
              />
              <Stack.Screen
                name="LocationWeatherDisplay"
                component={SpecificLocationWeather}
              />
              <Stack.Screen
                name="NetflixHome"
                component={NetflixHorizontalTitles}
              />
              <Stack.Screen name="TitleDetails" component={TitleDetails} />
              <Stack.Screen
                name="MapBoxScreen"
                component={SampleMapBoxScreen}
              />
            </Stack.Navigator>
            {/* <Navigator/> */}
            <Toast />
          </NavigationContainer>
        </StoreInternalDataProvider>
      </AuthContextProvider>
    </PaperProvider>
  );
}

export default App;
