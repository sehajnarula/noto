import React,{useState} from "react";
import {View,StyleSheet,Text,TextInput,Image,SafeAreaView,TouchableOpacity,ScrollView} from "react-native";
import {fontFamilies} from "../constants/fonts";

const CreateNewPassword = () =>{

    const createNewPasswordScreenText = "Create a New Password";
    const createPasswordButton = "Create Password";
    const createNewPasswordPrompt = "Your new password should be different from the previous password";
    const newPasswordHeader = "New Password";
    const retypeNewPasswordHeader = "Retype New Password";
    const [userEnteredNewPassword,setPassword] = useState("");
    const [userReEnteredNewPassword,setRePassword] = useState("");
    const passwordRequirements = "min. 8 character, combination of 0-9, A-Z, a-z";

    return(

      <SafeAreaView style = {{flex:1}}>

       <ScrollView contentContainerStyle = {{flexGrow:1,marginTop:30,marginBottom:10}}>
        
        <View style={{flex:1,padding:4,justifyContent:'center'}}>

        <Text
        style = {createNewPasswordLayout.createNewPasswordScreenName}>
        {createNewPasswordScreenText}    
        </Text>
        
        <Text
        style = {createNewPasswordLayout.createPasswordPromptText}>
        {createNewPasswordPrompt}   
        </Text>

        <Text
        style = {createNewPasswordLayout.enterNewPasswordHeader}>
        {newPasswordHeader}   
        </Text>

        <TextInput
         style = {createNewPasswordLayout.enterNewPasswordTextInput}
         autoCapitalize="none"
         autoCorrect={false}
         placeholder="Enter New Password"
         placeholderTextColor={"#C8C5CB"}
         onChangeText={input => setPassword(input)}
         secureTextEntry = {true}
         value={userEnteredNewPassword}> 
         </TextInput>

         <Text style = {createNewPasswordLayout.passwordRequirementsPrompt}>
          {passwordRequirements}  
         </Text>

        <Text
        style = {createNewPasswordLayout.retypeNewPasswordHeader}>
        {retypeNewPasswordHeader}   
        </Text>

        <TextInput
         style = {createNewPasswordLayout.retypeNewPasswordTextInput}
         autoCapitalize="none"
         autoCorrect={false}
         placeholder="Enter New Password"
         placeholderTextColor={"#C8C5CB"}
         onChangeText={input => setRePassword(input)}
         secureTextEntry = {true}
         value={userReEnteredNewPassword}> 
         </TextInput>

        </View>
        
        </ScrollView> 

         <View style = {{flexDirection:'column',marginBottom:15}}>

            <TouchableOpacity
              activeOpacity={0.9}
              style = {createNewPasswordLayout.createPasswordTouchableOpacity}>
              <View style = {createNewPasswordLayout.touchableOpacityViewStyle}>
              <Text
              style = {{flex:1,color:'#FFFFFF',textAlign:'center',fontSize:16}}>
              {createPasswordButton}  
              </Text>
              </View>  
            </TouchableOpacity>   
            
         </View>   

      </SafeAreaView>  

    );

};

const createNewPasswordLayout = StyleSheet.create({

    createNewPasswordScreenName:{
      fontSize:32,
      color:'#180E25',
      fontFamily:fontFamilies.INTER.bold,
      marginHorizontal:10,
      marginTop:10 
    },

    touchableOpacityViewStyle:{
      flexDirection:'row',
      justifyContent:'center',
      position:'relative',
    },

    createPasswordTouchableOpacity:{
       backgroundColor:'#6A3EA1',
       padding:14,
       marginTop:20,
       borderRadius:30,
       justifyContent:'center',
       marginHorizontal:15,
    },

    createPasswordPromptText:{
        fontFamily:fontFamilies.INTER.regular,
        fontSize:16,
        color:'#827D89',
        marginHorizontal:10,
        marginTop:6  
    },

    enterNewPasswordHeader:{
         fontSize:16,
         color:'#180E25',
         fontFamily:fontFamilies.INTER.bold,
         marginTop:30,
         marginLeft:10 
    },

    passwordRequirementsPrompt:{
        color:'#C8C5CB',
        fontFamily:fontFamilies.INTER.regular,
        fontSize:12,
        marginTop:10,
        marginLeft:12
    },
    
    enterNewPasswordTextInput:{
         marginTop:10,
         padding:15,
         borderColor:'#C8C5CB',
         borderRadius:10,
         borderWidth:1,
         marginHorizontal:10,
         color:'#000000',
         fontFamily:fontFamilies.INTER.medium 
    },

    retypeNewPasswordHeader:{
         fontSize:16,
         color:'#180E25',
         fontFamily:fontFamilies.INTER.bold,
         marginTop:30,
         marginLeft:10 
    },

    retypeNewPasswordTextInput:{
         marginTop:10,
         padding:15,
         borderColor:'#C8C5CB',
         borderRadius:10,
         borderWidth:1,
         marginHorizontal:10,
         color:'#000000',
         fontFamily:fontFamilies.INTER.medium 
    },

});

export default CreateNewPassword;