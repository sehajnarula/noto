import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,Text,TextInput,Image,SafeAreaView,TouchableOpacity,ScrollView} from "react-native";
import {fontFamilies} from "../constants/fonts";
// import {getAuth,createUserWithEmailAndPassword} from "@react-native-firebase/auth";
// import {getFirestore,doc,setDoc} from "@react-native-firebase/firestore";
import {auth,firestore} from '../../firebaseconfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc,setDoc} from 'firebase/firestore';
import Arrow from '../../assets/images/arrowright.svg';
import Toast from "react-native-toast-message";
import {useNavigation,useIsFocused} from "@react-navigation/native";
import {collection,getDocs} from "firebase/firestore";
import * as progress from 'react-native-progress';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Register = () =>{

    const registerPrompt = "Register";
    const andNotesText = "And start taking notes";
    const fullNameHeaderText = "Full Name";
    const emailAddressHeaderText = "Email Address";
    const passwordHeaderText = "Password";
    const retypePasswordHeaderText = "Retype Password";
    const registerButton = "Register";
    const [userEnteredFullName,setFullName] = useState("");
    const [userEnteredEmailAddress,setEmailAddress] = useState("");
    const [userEnteredPassword,setPassword] = useState("");
    const [userReEnteredPassword,setRePassword] = useState("");
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).{6,}$/;
    const [savedUsers,setSavedDbUsers] = useState([]);
    const [loading,setProgressLoading] = useState(false);
    const insets = useSafeAreaInsets();

   const fetchAllUsersFromDb = async() =>{
          try {
          const userSnapshot = await getDocs(collection(firestore,"users"));
          const usersArray = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedDbUsers(usersArray)      
          } catch (error) {
            console.log("userdbfetcherror",error)
          }
      };

      useEffect(()=>{
         if(isFocused){
           fetchAllUsersFromDb(); 
         }   
      },[isFocused]);

    return(

      <SafeAreaView style = {{flex:1}}>
       
      {loading && (
        <View style = {registerScreenLayout.progressLoaderOverlayBg}>
        <View style = {registerScreenLayout.progressLoaderContainer}>
        <progress.Circle
        indeterminate
        size={50}
        color="#6A3EA1">
        </progress.Circle>
        </View>
      </View>
      )}

       <ScrollView contentContainerStyle = {{flexGrow:1,marginTop:20,marginBottom:10}}>
        
       <View style = {{flex:1,padding:4}}>
       
       <Text style = {registerScreenLayout.registerScreenName}>{registerPrompt}</Text>    
       <Text style = {{color:'#827D89',fontSize:16,marginLeft:10,marginTop:7,fontFamily:fontFamilies.INTER.regular}}>{andNotesText}</Text> 
       <Text style = {registerScreenLayout.fullNameHeader}>{fullNameHeaderText}</Text> 
       
        <TextInput
        style = {registerScreenLayout.fullNameTextInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Example: John Doe"
        placeholderTextColor={"#C8C5CB"}
        onChangeText={input => setFullName(input)}
        value={userEnteredFullName}
        > 
        </TextInput>

        <Text style = {registerScreenLayout.emailAddressHeader}>{emailAddressHeaderText}</Text> 
       
        <TextInput
        style = {registerScreenLayout.emailAddressTextInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Example: johndoe@gmail.com"
        placeholderTextColor={"#C8C5CB"}
        onChangeText={input => setEmailAddress(input)}
        value={userEnteredEmailAddress}
        > 
        </TextInput>

        <Text style = {registerScreenLayout.passwordHeader}>{passwordHeaderText}</Text>

       <TextInput
       style = {registerScreenLayout.passwordTextInput}
       autoCapitalize="none"
       autoCorrect={false}
       placeholder="Enter Password"
       placeholderTextColor={"#C8C5CB"}
       onChangeText={input => setPassword(input)}
       secureTextEntry = {true}
       value={userEnteredPassword}
       > 
       </TextInput>

      <Text style = {registerScreenLayout.reEnterPasswordHeader}>{retypePasswordHeaderText}</Text> 

       <TextInput
       style = {registerScreenLayout.reEnterPasswordTextInput}
       autoCapitalize="none"
       autoCorrect={false}
       placeholder="Retype Password"
       placeholderTextColor={"#C8C5CB"}
       onChangeText={input => setRePassword(input)}
       secureTextEntry = {true}
       value={userReEnteredPassword}
       > 
       </TextInput>

       </View>
        
        </ScrollView>

        <View style = {{flexDirection:'column',marginBottom:insets.bottom+10}}>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>{

               const userFound = savedUsers.some(user=> user.emailAddress===userEnteredEmailAddress);

                 if(userEnteredFullName===""){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Full Name.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else if(userEnteredEmailAddress===""){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Email Address.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else if(!emailRegex.test(userEnteredEmailAddress)){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Valid Email Address.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else if(userEnteredPassword===""){
                    Toast.show({
                    type:'error',
                    text1: 'Enter Password.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else if(userReEnteredPassword===""){
                    Toast.show({
                    type:'error',
                    text1: 'Retype Your Password.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else if(!passwordRegex.test(userEnteredPassword)){
                    Toast.show({
                    type:'error',
                    text1: 'Password should have 1 special character, 6 characters and 1 number.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    })
                 }else if(userEnteredPassword!==userReEnteredPassword){
                    Toast.show({
                    type:'error',
                    text1: 'Passwords do not match.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    })
                 }else if(userFound){
                  Toast.show({
                    type:'error',
                    text1: 'Email Address Already Exists',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                    });
                 }else{
                    setProgressLoading(true);
                    createUserWithEmailAndPassword(auth,userEnteredEmailAddress,userReEnteredPassword)
                      .then(async(userCredential)=>{
                        const {uid,email} = userCredential.user;
                        await setDoc(doc(firestore,"users",uid),{
                          fullName:userEnteredFullName,
                          emailAddress:email
                        });
                        Toast.show({
                        type:'success',
                        text1: 'User Created Successfully',
                        autoHide: true,
                        position:'bottom',
                        visibilityTime: 3000,
                    });
                    setProgressLoading(false);
                    setFullName("");
                    setEmailAddress("");
                    setPassword("");
                    setRePassword("")
                    navigation.navigate("LoginScreen");
                  }).catch(error=>{
                    setProgressLoading(false);
                      if (error.code === 'auth/email-already-in-use') {
                          Toast.show({
                          type:'error',
                          text1: 'Entered Email Address Already Exists.',
                          autoHide: true,
                          position:'bottom',
                          visibilityTime: 3000,
                        })
                      } 
                  });
                }

              }}
              style = {registerScreenLayout.registerTouchableOpacity}>
              <View style = {registerScreenLayout.touchableOpacityViewStyle}>
              <Text
              style = {{flex:1,color:'#FFFFFF',textAlign:'center',fontSize:16,fontFamily:fontFamilies.INTER.medium}}>
              {registerButton}  
              </Text>
              <Arrow position = {'absolute'} right = {0} marginTop = {2}>
              </Arrow>
              </View>  
              </TouchableOpacity>

        </View>  
      
      </SafeAreaView>  

    );

};

const registerScreenLayout = StyleSheet.create({

    registerScreenName:{
       fontSize:32,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold,
       marginLeft:10,
       marginTop:10 
    },

    fullNameHeader:{
       fontSize:16,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold, 
       marginLeft:10,
       marginTop:25 
    },

    emailAddressHeader:{
       fontSize:16,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold, 
       marginLeft:10,
       marginTop:20
    },

    passwordHeader:{
       fontSize:16,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold,
       marginLeft:10,
       marginTop:20 
    },

    reEnterPasswordHeader:{
       fontSize:16,
       color:'#180E25',
       fontFamily:fontFamilies.INTER.bold,
       marginLeft:10,
       marginTop:20
    },

    touchableOpacityViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        position:'relative',
    },

    emailAddressTextInput:{
      marginTop:6,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium 
    },

    fullNameTextInput:{
      marginTop:6,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:10,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium 
    },

    passwordTextInput:{
      marginTop:7,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium
    },

    reEnterPasswordTextInput:{
      marginTop:7,
      padding:15,
      borderColor:'#C8C5CB',
      borderRadius:10,
      marginHorizontal:12,
      borderWidth:1,
      color:'#000000',
      fontFamily:fontFamilies.INTER.medium
    },

    registerTouchableOpacity:{
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
    },

});

export default Register;