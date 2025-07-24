import React,{useState,useEffect, useContext} from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text,TouchableOpacity,TextInput} from "react-native";
import {fontFamilies} from "../constants/fonts";
import TickIcon from "../../assets/images/editprofiletick.svg";
import {useIsFocused} from "@react-navigation/native";
import StoreInternalData from "../context/StoreInternalData";
import {AuthContext} from "../context/AuthContext";
import {collection,getDocs} from "firebase/firestore";
import {doc,setDoc,updateDoc} from 'firebase/firestore';
import {auth,firestore} from '../../firebaseconfig';
import ChangeImageIcon from "../../assets/images/editprofilepencil.svg";
import Toast from "react-native-toast-message";
import * as progress from 'react-native-progress';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const EditProfile = () =>{

    const [userFullName,setUserFullName] = useState("");
    const [userEmailAddress,setUserEmailAddress] = useState("");
    const [userId,setUserId] = useState("");
    const [loginToken,setLoginToken] = useState("");
    const emailChangeMessage = "Changing email address information means you need to re-login to the app."
    const isFocused = useIsFocused();
    const {savedUser,getUserToken} = useContext(StoreInternalData);
    const {user} = useContext(AuthContext);
    const [savedUsers,setSavedDbUsers] = useState([]);
    const [loading,setProgressLoading] = useState(false);
    const insets = useSafeAreaInsets();

    const fetchAllUsersFromDb = async(userIdMethod) =>{
              try {
              const userSnapshot = await getDocs(collection(firestore,"users"));
              const usersArray = userSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setSavedDbUsers(usersArray);      
            const getUser = usersArray.find(users=>users.id===userIdMethod);  
            if(getUser){
              setUserFullName(getUser.fullName);
            } 
          } catch (error) {
                console.log("userdbfetcherror",error)
              }
          };

    useEffect(()=>{
      if(isFocused){
        getUserToken();
        setUserId(user?.uid);
        setUserEmailAddress(user.email);
        setLoginToken(savedUser);
      }
    },[isFocused]);

    useEffect(()=>{
      if(userId){
        fetchAllUsersFromDb(userId);
      }
    },[userId]);

          const updateDocInDb = async(userIdUpdate,updatedData)=>{
              try {
              const documentReference = doc(firestore,"users",userIdUpdate);
              await updateDoc(documentReference,updatedData).then(()=>{
                Toast.show({
                    type:'success',
                    text1: 'Updated Successfully.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                  });
                  setProgressLoading(false);
              }).catch((error)=>{
                Toast.show({
                    type:'error',
                    text1: 'Unable to update',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                  });
                  setProgressLoading(false);
              });
              } catch (error) {
                console.log("updateerror",error);
                setProgressLoading(false);
              }
            };

    return(

       <SafeAreaView style = {{flex:1}}>

        {loading &&(
          <View style = {editProfileLayout.progressLoaderOverlayBg}>
            <View style = {editProfileLayout.progressLoaderContainer}>
              <progress.Circle
              indeterminate
              size={50}
              color="#6A3EA1"/>
            </View>
          </View>
        )}

        <ScrollView contentContainerStyle = {{flexGrow:1}}>

          <View style = {{flex:1,padding:4}}>
         
          <View style = {{justifyContent:'center',alignItems:'center',marginTop:15}}>
          <View style = {{padding:40,backgroundColor:"#D3D3D3",borderRadius:50}}>
          </View> 
         </View> 

          <TouchableOpacity
          activeOpacity={1}
          style = {{borderWidth:1,borderRadius:30,borderColor:'#6A3EA1',padding:5,marginHorizontal:50,top:5}}>
           <View style = {{flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative'}}>
           <View style = {{position:'absolute',left:60}}>
            <ChangeImageIcon width={20} height={20}>
            </ChangeImageIcon>
          </View>
        <Text style = {{color:'#6A3EA1',fontSize:16,textAlign:'center'}}>
        {"Change Image"}   
        </Text> 
          </View> 
          </TouchableOpacity>

          <View style = {editProfileLayout.underLineView}>
          </View>

          <View style = {{top:80}}>

            <Text
            style = {{color:'#180E25',fontSize:16,marginLeft:12}}>
            {"Full Name"}
            </Text>
            
            <TextInput
            style = {editProfileLayout.currentPasswordTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Full Name"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setUserFullName(input)}
            value={userFullName}> 
            </TextInput>

            <Text
            style = {{color:'#180E25',fontSize:16,marginLeft:12,marginTop:30}}>
            {"Email Address"}
            </Text>
         
            <TextInput
            style = {editProfileLayout.currentPasswordTextInputTwo}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email Address"
            placeholderTextColor={"#C8C5CB"}
            onChangeText={input => setUserEmailAddress(input)}
            value={userEmailAddress}> 
            </TextInput>

            <Text style = {{color:'#C8C5CB',fontSize:12,marginTop:12,marginHorizontal:12}}>
             {emailChangeMessage}   
            </Text>

          </View>

         </View>

        <View style = {{flexDirection:'column',marginBottom:insets.bottom + 10}}>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>{
                if(userFullName===""){
                  Toast.show({
                    type:'error',
                    text1: 'Enter name.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                  });
                }else if(userEmailAddress===""){
                  Toast.show({
                    type:'error',
                    text1: 'Enter Email Address.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                  });
                }else{
                  setProgressLoading(true);
                  updateDocInDb(userId,{
                  fullName:userFullName,
                  emailAddress:userEmailAddress
                });
                }
              }}
              style = {editProfileLayout.createPasswordTouchableOpacity}>
              <View style = {editProfileLayout.touchableOpacityViewStyle}>
              <View style = {{position:'absolute',left:4}}>
               <TickIcon width = {20} height = {20} marginTop = {2}></TickIcon> 
              </View>
              <Text
              style = {{flex:1,color:'#FFFFFF',textAlign:'center',fontSize:16}}>
              {"Save Changes"}  
              </Text>
              </View>  
            </TouchableOpacity>   
            
         </View>  

        </ScrollView>
       </SafeAreaView> 

    );

};

const editProfileLayout = StyleSheet.create({

    currentPasswordTextInput:{
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      marginTop:5,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium
    },

    currentPasswordTextInputTwo:{
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      borderWidth:1,
      marginTop:5,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium
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

    underLineView:{
    backgroundColor:'#EFEEF0',
    marginHorizontal:12,
    marginTop:40,
    borderWidth:0.2
  },

});

export default EditProfile;