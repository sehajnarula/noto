import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Pressable
} from "react-native";

import { fontFamilies } from "../constants/fonts";
import Arrow from "../../assets/images/arrowright.svg";
import SocialGoogle from "../../assets/images/signinwithgoogle.svg";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as progress from 'react-native-progress';
import { auth } from '../../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import StoreInternalData from "../context/StoreInternalData";
import { AuthContext } from "../context/AuthContext";
import { closeApp } from "../constants/commonfunctions";

const Login = () => {

  const loginPrompt = "Let's Login";
  const andNotesText = "And note your ideas";
  const emailAddressHeaderText = "Email Address";
  const passwordHeaderText = "Password";
  const forgetPassword = "Forget Password";
  const orText = "Or";
  const loginButton = "Login";
  const loginWithGoogle = "Login With Google";
  const registerUserText = "Don't have any account? Register here";
  const [loading,setProgressLoading] = useState(false);
  const [userEnteredEmailAddress, setEmailAddress] = useState("");
  const [userEnteredPassword, setPassword] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { saveUserToken } = useContext(StoreInternalData);
  const {user,setUser,googleSignInButtonPress} = useContext(AuthContext);

  // Handle Android Back Button
  useEffect(() => {
    let backHandlerCloseScreen;
    if (isFocused) {
      backHandlerCloseScreen = BackHandler.addEventListener("hardwareBackPress", () => {
        closeApp();
        return true;
      });
    }
    return () => {
      if (backHandlerCloseScreen) {
        backHandlerCloseScreen.remove();
      }
    };
  }, [isFocused]);

  // Show Toast Utility
  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      autoHide: true,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  // Main login function
  const userLogin = async () => {
    const isEmailEmpty = userEnteredEmailAddress.trim() === "";
    const isPasswordEmpty = userEnteredPassword.trim() === "";

    isEmailEmpty
      ? showToast('error', 'Enter Email To Login.')
      : isPasswordEmpty
      ? showToast('error', 'Enter Password To Login.')
      : await handleLogin(userEnteredEmailAddress, userEnteredPassword);
  };

  // Firebase Email/Password login
  const handleLogin = async (email, password) => {
    setProgressLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = res.user;

      if (loggedInUser?.accessToken) {
        setUser(loggedInUser);
        saveUserToken(loggedInUser.accessToken);
        showToast('success', 'Login Successful.');
        setProgressLoading(false);
      } else {
        showToast('error', 'Unable To Login.');
        setProgressLoading(false);
      }
    } catch (error) {
      console.log("signinerror", error);
      showToast('error', 'Login Failed. Please Try Again.');
      setProgressLoading(false);
    }finally{
      setProgressLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
    {loading && (
        <View style = {loginScreenLayout.progressLoaderOverlayBg}>
       <View style = {loginScreenLayout.progressLoaderContainer}>
       <progress.Circle
          indeterminate
          size={50}
          color="#6A3EA1"/>
       </View> 
      </View>
    )}
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 20 }}>
        <View style={{ flex: 1, padding: 4 }}>
          <Text style={loginScreenLayout.loginScreenName}>{loginPrompt}</Text>
          <Text style={styles.subText}>{andNotesText}</Text>

          <Text style={loginScreenLayout.emailAddressHeader}>{emailAddressHeaderText}</Text>
          <TextInput
            style={loginScreenLayout.emailAddressTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Example: johndoe@gmail.com"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setEmailAddress(input)}
            value={userEnteredEmailAddress}
          />

          <Text style={loginScreenLayout.passwordHeader}>{passwordHeaderText}</Text>
          <TextInput
            style={loginScreenLayout.passwordTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Password"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setPassword(input)}
            secureTextEntry={true}
            value={userEnteredPassword}
          />

          <Text
            style={loginScreenLayout.forgotPasswordText}
            onPress={() => navigation.navigate("ForgetPasswordScreen")}
          >
            {forgetPassword}
          </Text>

          <Pressable onPress={userLogin} style={loginScreenLayout.loginTouchableOpacity}>
            <View style={loginScreenLayout.touchableOpacityViewStyle}>
              <Text style={styles.loginButtonText}>{loginButton}</Text>
              <Arrow position="absolute" right={0} marginTop={2} />
            </View>
          </Pressable>

          <View style={loginScreenLayout.orViewStyle}>
            <View style={loginScreenLayout.orLine} />
            <Text style={loginScreenLayout.orCredentialText}>{orText}</Text>
            <View style={loginScreenLayout.orLine} />
          </View>

          <TouchableOpacity style={loginScreenLayout.loginWithGoogleTo} 
            activeOpacity={0.9}
            onPress={()=>{
              googleSignInButtonPress();
              // if(user?.accessToken){
              //   saveUserToken(user?.accessToken);
              // }
            }}
            >
            <View style={loginScreenLayout.loginGoogleView}>
              <SocialGoogle position={'absolute'} left={60} />
              <Text style={styles.googleLoginText}>{loginWithGoogle}</Text>
            </View>
          </TouchableOpacity>

          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {registerUserText}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subText: {
    color: '#827D89',
    fontSize: 16,
    marginLeft: 11,
    marginTop: 7,
    fontFamily: fontFamilies.INTER.regular,
  },
  loginButtonText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fontFamilies.INTER.medium,
  },
  googleLoginText: {
    flex: 1,
    textAlign: 'center',
    marginLeft:30,
    fontFamily: fontFamilies.INTER.bold,
    fontSize: 16,
    color: '#000000',
  },
  registerText: {
    fontFamily: fontFamilies.INTER.medium,
    fontSize: 16,
    color: '#6A3EA1',
    textAlign: 'center',
    marginTop: 30,
  },
});

const loginScreenLayout = StyleSheet.create({

  loginScreenName: {
    fontSize: 32,
    color: '#180E25',
    fontFamily: fontFamilies.INTER.bold,
    marginLeft: 10,
    marginTop: 10,
  },
  emailAddressHeader: {
    fontSize: 16,
    color: '#180E25',
    fontFamily: fontFamilies.INTER.bold,
    marginLeft: 10,
    marginTop: 25,
  },
  passwordHeader: {
    fontSize: 16,
    color: '#180E25',
    fontFamily: fontFamilies.INTER.bold,
    marginLeft: 10,
    marginTop: 20,
  },
  emailAddressTextInput: {
    marginTop: 7,
    padding: 15,
    borderColor: '#C8C5CB',
    borderRadius: 10,
    marginHorizontal: 12,
    borderWidth: 1,
    color: '#000000',
    fontFamily: fontFamilies.INTER.medium,
  },
  passwordTextInput: {
    marginTop: 7,
    padding: 15,
    borderColor: '#C8C5CB',
    borderRadius: 10,
    marginHorizontal: 12,
    borderWidth: 1,
    color: '#000000',
    fontFamily: fontFamilies.INTER.medium,
  },
  forgotPasswordText: {
    color: '#6A3EA1',
    marginTop: 10,
    marginLeft: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#C8C5CB',
    fontSize: 16,
    fontFamily: fontFamilies.INTER.regular,
  },
  loginTouchableOpacity: {
    backgroundColor: '#6A3EA1',
    padding: 14,
    marginTop: 20,
    borderRadius: 30,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  touchableOpacityViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  orViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 7,
  },
  orLine: {
    backgroundColor: '#EFEEF0',
    flex: 1,
    height: 1,
  },
  orCredentialText: {
    color: '#827D89',
    fontSize: 12,
    marginHorizontal: 16,
    fontFamily: fontFamilies.INTER.regular,
  },
  loginWithGoogleTo: {
    borderWidth: 1,
    borderColor: '#C8C5CB',
    borderRadius: 30,
    padding: 14,
    marginTop: 10,
    marginHorizontal: 15,
  },
  loginGoogleView: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLoaderOverlayBg:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999
    },
    progressLoaderContainer:{
      elevation:5,
      shadowColor:'#000',
      borderRadius:10,
      backgroundColor:'#FFFFFF',
      width:100,
      height:100,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },
});

export default Login;
