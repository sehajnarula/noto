import React,{useState} from "react";
import {View,StyleSheet,Text,TextInput,Image,SafeAreaView,TouchableOpacity,ScrollView} from "react-native";
import {fontFamilies} from "../constants/fonts";
import {auth} from '../../firebaseconfig';
import * as progress from 'react-native-progress';
import Toast from "react-native-toast-message";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ForgetPassword = () =>{

    const sendCodeButton = "Send Code";
    const forgetPasswordText = "Forget Password";
    const enterEmailPrompt = "Insert your email address to receive a code for creating a new password";
    const emailAddressHeaderText = "Email Address";
    const [userEnteredEmailAddress,setEmailAddress] = useState("");
    const [loading,setProgressLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const insets = useSafeAreaInsets();

    return(

    <SafeAreaView style = {{flex:1}}>

     {loading && (
      <View style = {forgetPasswordStyleSheet.progressLoaderOverlayBg}>
       <View style = {forgetPasswordStyleSheet.progressLoaderContainer}>
       <progress.Circle
       indeterminate
       size={50}
       color="#6A3EA1"/>
       </View> 
      </View>
     )} 

     <ScrollView contentContainerStyle = {{flexGrow:1,marginTop:30,marginBottom:10}}>

      <View style = {{flex:1,justifyContent:'center',padding:4}}>

        <Text
        style = {forgetPasswordStyleSheet.forgetPasswordScreenName}>
        {forgetPasswordText}    
        </Text>
        
        <Text
        style = {forgetPasswordStyleSheet.enterEmailProptText}>
        {enterEmailPrompt}   
        </Text>

        <Text
        style = {forgetPasswordStyleSheet.emailAddressHeader}>
        {emailAddressHeaderText}   
        </Text>

        <TextInput
        style = {forgetPasswordStyleSheet.emailAddressTextInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Example: johndoe@gmail.com"
        placeholderTextColor={"#C8C5CB"}
        onChangeText={input => setEmailAddress(input)}
        value={userEnteredEmailAddress}> 
        </TextInput>  
      
      </View>  

     </ScrollView>

        <View style = {{flexDirection:'column',marginBottom:insets.bottom+5}}>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>{
                if(userEnteredEmailAddress===""){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Your Email.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                }else if(!emailRegex.test(userEnteredEmailAddress)){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Valid Email.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                }else{
                    
                }
              }}
              style = {forgetPasswordStyleSheet.sendCodeTouchableOpacity}>
              <View style = {forgetPasswordStyleSheet.touchableOpacityViewStyle}>
              <Text
              style = {{flex:1,color:'#FFFFFF',textAlign:'center',fontSize:16}}>
              {sendCodeButton}  
              </Text>
              </View>  
              </TouchableOpacity>

        </View>         

    </SafeAreaView>    


   );
 
};

const forgetPasswordStyleSheet = StyleSheet.create({

    forgetPasswordScreenName:{
       fontSize:32,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold,
       marginLeft:10,
       marginTop:10 
    },

    enterEmailProptText:{
      fontFamily:fontFamilies.INTER.regular,
      fontSize:16,
      color:'#827D89',
      marginHorizontal:10,
      marginTop:6  
    },

    touchableOpacityViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        position:'relative',
    },

    emailAddressHeader:{
       fontSize:16,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold,
       marginTop:30,
       marginLeft:10 
    },

    emailAddressTextInput:{
      marginTop:15,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      borderWidth:1,
      marginHorizontal:10,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium 
    },

    sendCodeTouchableOpacity:{
        backgroundColor:'#6A3EA1',
        padding:14,
        marginTop:20,
        borderRadius:30,
        justifyContent:'center',
        marginHorizontal:15,
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
    }

});

export default ForgetPassword;