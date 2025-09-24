import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import ForgetPassword from '../../screens/ForgetPassword';
import ForgetPasswordCodeEnterScreen from '../../screens/ForgetPasswordCodeEnterScreen';
import CreateNewPassword from '../../screens/CreateNewPassword';

const Stack = createNativeStackNavigator();

const AuthStack = ()=>{

  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginScreen" component={Login}/>
      <Stack.Screen name="RegisterScreen" component={Register}/>
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPassword}/>
      <Stack.Screen name="ForgetPasswordOtp" component={ForgetPasswordCodeEnterScreen}/>
      <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPassword}/>
      </Stack.Navigator>
  );

};

export default AuthStack;