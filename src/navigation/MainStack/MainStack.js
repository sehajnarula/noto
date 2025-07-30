import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../../screens/EditProfile';
import SettingsScreen from '../../screens/SettingsScreen';
import ChangePassword from '../../screens/ChangePassword';
import HomeScreen from '../../screens/HomeScreen';
import NewNote from '../../screens/NewNote';
import SearchScreen from '../../screens/SearchScreen';
import FinishedScreen from '../../screens/FinishedScreen';
import Tabs from '../Tabs';
import OnBoardingNew from '../../screens/OnBoardingNew';
import CreateNewNote from '../../screens/CreateNewNote';
import UpdateNote from '../../screens/UpdateNote';
import CameraViewScreen from '../../screens/CameraViewScreen';

const Stack = createNativeStackNavigator();

const MainStack = ()=>{
  return (
    <Stack.Navigator initialRouteName="TabsScreen" screenOptions={{headerShown:false}}>
     <Stack.Screen name="NewNoteScreen" component={NewNote}/>
     <Stack.Screen name="OnBoardingScreen" component={OnBoardingNew}/>
     <Stack.Screen name="TabsScreen" component={Tabs}/>
     <Stack.Screen name="HomeTabScreen" component={HomeScreen}/>
     <Stack.Screen name="Settings" component={SettingsScreen}/>
     <Stack.Screen name="Search" component={SearchScreen}/>
     <Stack.Screen name="ChangePasswordScreen" component={ChangePassword}/>
     <Stack.Screen name="EditProfileScreen" component={EditProfile}/>    
     <Stack.Screen name="FinishedScreen" component={FinishedScreen}/>
     <Stack.Screen name="CreateNewNoteScreen" component={CreateNewNote}/>    
     <Stack.Screen name="UpdateNoteScreen" component={UpdateNote}/>
     <Stack.Screen name="ShowCamera" component={CameraViewScreen}/>   
     </Stack.Navigator>
  );
};

export default MainStack;