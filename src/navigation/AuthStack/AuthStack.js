import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import ForgetPassword from '../../screens/ForgetPassword';

const Stack = createNativeStackNavigator();

const AuthStack = ()=>{

  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPassword} />
      </Stack.Navigator>
  );

};

export default AuthStack;