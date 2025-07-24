import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,ScrollView,TouchableOpacity,TextInput,SafeAreaView,Text} from "react-native";
import {fontFamilies} from "../constants/fonts";
import SubmitPasswordArrow from "../../assets/images/arrowright.svg" 
import {AuthContext} from "../context/AuthContext";
import {firestore} from "../../firebaseconfig";
import {auth} from '../../firebaseconfig';
import {EmailAuthProvider,reauthenticateWithCredential,updatePassword} from 'firebase/auth';
import Toast from "react-native-toast-message";
import * as progress from 'react-native-progress';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ChangePassword = () => {

    const [userPreviousPassword,setPreviousPassword] = useState("");
    const [userNewPassword,setNewPassword] = useState("");
    const [userRetypePassword,setRetypePassword] = useState("");
    const {user} = useContext(AuthContext);
    const [loading,setProgressLoading] = useState(false);
    const insets = useSafeAreaInsets();

    const changeUserPassword = async(currentUser,currentUserCredential,newPassword)=>{
      try {
        await reauthenticateWithCredential(currentUser,currentUserCredential)
          .then(()=>{
           updatePassword(currentUser,newPassword)
            .then(()=>{
                  Toast.show({
                   type:'success',
                   text1: 'Password Updated Successfully',
                   autoHide: true,
                   position:'bottom',
                   visibilityTime: 3000,
                  });
              setProgressLoading(false);
              setPreviousPassword("");
              setNewPassword("");
              setRetypePassword("");
            }).catch((error)=>{
                setProgressLoading(false);
                console.log("passwordupdateerror",error)
            });  
          }).catch((error)=>{
            setProgressLoading(false);
            console.log("reauthenticateerror",error)
          });
      } catch (error) {
            Toast.show({
            type:'error',
            text1: 'Unable to update password',
            autoHide: true,
            position:'bottom',
            visibilityTime: 3000,
            });
        setProgressLoading(false);
      }finally{
        setProgressLoading(false);
      }
    };

    return(

      <SafeAreaView style = {{flex:1}}>

      {loading &&(
        <View style = {ChangePasswordStyleLayout.progressLoaderOverlayBg}>
          <View style = {ChangePasswordStyleLayout.progressLoaderContainerBg}>
            <progress.Circle
            indeterminate
            size={50}
            color="#6A3EA1"/>
          </View>
        </View>
      )}

        <ScrollView contentContainerStyle = {{flexGrow:1}}>

         <View style = {{flex:1,padding:4}}>

           <Text
           style = {{color:'#6A3EA1',fontSize:12,marginLeft:10,marginTop:20,fontFamily:fontFamilies.INTER.medium}}>
            {"Please input your current password first"}
           </Text>

           <Text
           style = {{color:'#180E25',fontSize:16,marginLeft:10,marginTop:25,fontFamily:fontFamilies.INTER.medium}}>
            {"Current password"}
           </Text>

            <TextInput
            style = {ChangePasswordStyleLayout.currentPasswordTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Current Password"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setPreviousPassword(input)}
            secureTextEntry = {true}
            value={userPreviousPassword}> 
            </TextInput>

            <View
            style = {ChangePasswordStyleLayout.underLineView}>
            </View>

            <Text
           style = {{color:'#6A3EA1',fontSize:12,marginLeft:12,marginTop:30,fontFamily:fontFamilies.INTER.medium}}>
            {"Now, create your new password"}
           </Text>

            <Text
           style = {{color:'#180E25',fontSize:16,marginLeft:12,marginTop:25,fontFamily:fontFamilies.INTER.medium}}>
            {"New password"}
           </Text>

            <TextInput
            style = {ChangePasswordStyleLayout.currentPasswordTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter New Password"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setNewPassword(input)}
            secureTextEntry = {true}
            value={userNewPassword}> 
            </TextInput>

            <Text style = {ChangePasswordStyleLayout.passwordParams}>
              {"Password should contain a-z, A-Z, 0-9"}  
            </Text>

            <Text
             style = {{color:'#180E25',fontSize:16,marginLeft:12,marginTop:25,fontFamily:fontFamilies.INTER.medium}}>
            {"Retype New password"}
           </Text>

            <TextInput
            style = {ChangePasswordStyleLayout.currentPasswordTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Retype New Password"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setRetypePassword(input)}
            secureTextEntry = {true}
            value={userRetypePassword}> 
            </TextInput>

         <View style = {{flex:1,flexDirection:'column',justifyContent:'flex-end',marginBottom:insets.bottom + 10}}>

            <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>{
              if(userPreviousPassword===""){
                  Toast.show({
                   type:'error',
                   text1: 'Enter your current password',
                   autoHide: true,
                   position:'bottom',
                   visibilityTime: 3000,
                  });
              }else if(userNewPassword===""){
                   Toast.show({
                   type:'error',
                   text1: 'Enter your new password',
                   autoHide: true,
                   position:'bottom',
                   visibilityTime: 3000,
                  });
              }else if(userRetypePassword===""){
                   Toast.show({
                   type:'error',
                   text1: 'Retype your new password',
                   autoHide: true,
                   position:'bottom',
                   visibilityTime: 3000,
                  });
              }else if(userNewPassword!==userRetypePassword){
                  Toast.show({
                   type:'error',
                   text1: 'New password does not match',
                   autoHide: true,
                   position:'bottom',
                   visibilityTime: 3000,
                  });
              }else{
                const credential = EmailAuthProvider.credential(user.email,userPreviousPassword);
                setProgressLoading(true);
                changeUserPassword(user,credential,userRetypePassword);
              }
            }}
             style = {{padding:14,backgroundColor:'#6A3EA1',borderRadius:30,marginHorizontal:12}}>
             <View
             style = {{flexDirection:'row',justifyContent:'center',alignItems:'center',position:'relative'}}>
             <Text style = {{color:'#FFFFFF',fontSize:16,textAlign:'center',fontFamily:fontFamilies.INTER.medium}}>
             {"Submit New Password"}   
             </Text>
             <View style = {{position:'absolute',right:10}}>
            <SubmitPasswordArrow width = {20} height = {20}>
             </SubmitPasswordArrow>
            </View>
             </View>   
            </TouchableOpacity>

         </View>

         </View>

        </ScrollView>

      </SafeAreaView>  

    );

};

const ChangePasswordStyleLayout = StyleSheet.create({

    currentPasswordTextInput:{
      marginTop:7,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium
    },

    underLineView:{
    backgroundColor:'#EFEEF0',
    marginHorizontal:12,
    marginTop:25,
    borderWidth:0.2
    },

    passwordParams:{
        color:'#C8C5CB',
        fontSize:12,
        fontFamily:fontFamilies.INTER.regular,
        marginLeft:14,
        marginTop:10
    },

    progressLoaderOverlayBg:{
      position:'absolute',
      top:0,
      bottom:0,
      right:0,
      left:0,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'rgba(0,0,0,0.3)',
      zIndex:999
    },

    progressLoaderContainerBg:{
      elevation:5,
      shadowColor:'#000',
      width:100,
      height:100,
      borderRadius:10,
      backgroundColor:"#FFFFFF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },

});

export default ChangePassword;