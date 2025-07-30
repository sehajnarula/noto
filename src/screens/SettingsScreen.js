import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text,TouchableOpacity,BackHandler} from "react-native";
import {fontFamilies} from "../constants/fonts";
import UserEmailIcon from "../../assets/images/mail.svg";
import EditProfileIcon from "../../assets/images/editprofilepencil.svg";
import ChangePasswordIcon from "../../assets/images/changepasswordicon.svg";
import ChangePasswordArrow from "../../assets/images/changepasswordarrow.svg";
import TextSizeIcon from "../../assets/images/textsizeicon.svg";
import NotificationsIcon from "../../assets/images/notificationsbell.svg"
import ChangeLanguageTranslation from "../../assets/images/selecttranslationlanguage.svg"
import LogoutIcon from "../../assets/images/logouticon.svg"
import {useNavigation,useIsFocused} from "@react-navigation/native";
import StoreInternalData from "../context/StoreInternalData";
import {AuthContext} from "../context/AuthContext";
import {firestore} from '../../firebaseconfig';
import {collection,getDocs} from "firebase/firestore";
import * as progress from 'react-native-progress';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import SelectLanguageBottomSheet from "../components/SelectLanguageBottomSheet";
import LanguageChangedSuccessfullyAnimation from "../components/LanguageChangedSuccessfullyAnimation";

const SettingsScreen = () =>{

    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [selectedLanguageText,setSelectedLanguageText] = useState("");
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {savedUser,loginUser,getUserToken,removeUserToken,getUserLanguageInStorage} = useContext(StoreInternalData);
    const {user,logout} = useContext(AuthContext);
    const [logoutAlert,setLogoutAlertStatus] = useState(false);
    const [loading,setProgressLoading] = useState(false);
    const insets = useSafeAreaInsets();
    const [loginToken,setLoginToken] = useState("");
    const [showLanguages,setShowLanguages] = useState(false);
    const [languageChangedInComponent, setLanguageChangedInComponent] = useState(false);
    const [showLanguageChangedAnimation, setShowLanguageChangedAnimation] = useState(false);
    
    const sendLanguages = [{
    displayLanguageName:'English',
    languageCode:'en'
    },
    {
    displayLanguageName:'हिंदी',
    languageCode:'hi'
    },
    {
    displayLanguageName:'ਪੰਜਾਬੀ',
    languageCode:'pa'
    }];

    const setSelectedLanguageOnScreen = async()=>{
      const userLanguageInStorage = await getUserLanguageInStorage();
      if(userLanguageInStorage!==""){
        const putLanguage = sendLanguages.find(languages=>languages.languageCode===userLanguageInStorage)
        if(putLanguage){
          setSelectedLanguageText(putLanguage.displayLanguageName);
        }
      }
    };

    const userLogout = ()=>{
      setLogoutAlertStatus(false);
      removeUserToken();
      logout();
    }

    const fetchAllUsersFromDb = async(userIdMethod) =>{
      //setProgressLoading(true);      
      try {
              const userSnapshot = await getDocs(collection(firestore,"users"));
              const usersArray = userSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
              }));     
              const getUser = usersArray.find(users=>users.id===userIdMethod);  
            if(getUser){
                setUserName(getUser.fullName);
                //setProgressLoading(false);
                } 
              } catch (error) {
                    //setProgressLoading(false);
                    console.log("userdbfetcherror",error)
                  }
            };

    useEffect(() => {
      let timer;
      if (isFocused && user?.uid) {
      getUserToken();
      setLoginToken(savedUser);
      setUserEmail(user?.email);
      fetchAllUsersFromDb(user?.uid);
      setSelectedLanguageOnScreen();
      }
      if (!showLanguages && languageChangedInComponent) {
        timer = setTimeout(() => {
        setShowLanguageChangedAnimation(true);
        setLanguageChangedInComponent(false);
        }, 500);
      } // showing animation after modal

      const backHandelingForLogout = () => {
      if (logoutAlert) {
      setLogoutAlertStatus(false);
      return true;
    }
    return false;
  };

    const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
     backHandelingForLogout
    );

    return () => {
      backHandler.remove();
      if (timer) clearTimeout(timer);
    };
    },[isFocused, user?.uid,languageChangedInComponent]);


    return(

      <SafeAreaView style = {{flex:1}}>

      {showLanguageChangedAnimation && (
        <Modal
          isVisible={true}
          onBackdropPress={() => setShowLanguageChangedAnimation(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropTransitionOutTiming={0}
          useNativeDriver
          hideModalContentWhileAnimating
          style={{margin: 0, justifyContent: 'center'}}>
          <LanguageChangedSuccessfullyAnimation
          onCompletion={() => setShowLanguageChangedAnimation(false)}/>
        </Modal>
        )}  

      {loading && (
        <View style = {settingsLayoutStyle.progressLoaderOverlayBg}>
          <View style = {settingsLayoutStyle.progressLoaderContainerBg}>
          <progress.Circle
          indeterminate
          size={50}
          color="#6A3EA1"/>
          </View>
        </View>
      )}

      <Modal
      isVisible={showLanguages}
      onBackdropPress={() => setShowLanguages(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{margin: 0,justifyContent:'flex-end' }}
      >
      <SelectLanguageBottomSheet
      closeModal={() => setShowLanguages(false)}
      isHorizontal={false}
      sendLanguagesInLayout={sendLanguages}
      updateLanguageLocally = {setSelectedLanguageText}
      languageSelectedInChild = {setLanguageChangedInComponent}
      />
      </Modal>

      {logoutAlert && (
        <View style = {settingsLayoutStyle.logoutOverlayBg}>
          <View style = {settingsLayoutStyle.logoutContainerBg}>
          <Text style = {{textAlign:'center',alignItems:'center',color:'#180E25',fontFamily:fontFamilies.INTER.bold,fontSize:20,marginTop:20}}>
          {"Log Out"}
          </Text>
          <Text style = {{color:'#827D89',fontSize:16,fontFamily:fontFamilies.INTER.regular,textAlign:'center',alignItems:'center',marginHorizontal:12,top:20}}>
          {"Are you sure you want to log out from the application?"}  
          </Text>
          <View style = {{top:60}}>
           <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
           <TouchableOpacity
           activeOpacity={1}
           style = {{width:108,height:38,borderRadius:30,borderWidth:1,borderColor:'#6A3EA1',backgroundColor:'#FFFFFF',paddingLeft:16,paddingRight:16,paddingTop:8,paddingBottom:8}}
           onPress={()=> setLogoutAlertStatus(false)}>
           <Text style = {{textAlign:'center',alignItems:"center",fontSize:16,color:'#6A3EA1',fontFamily:fontFamilies.INTER.medium}}>
           {"Cancel"}
           </Text>   
           </TouchableOpacity>
          <TouchableOpacity
           activeOpacity={1}
           style = {{width:108,height:38,borderRadius:30,backgroundColor:'#6A3EA1',paddingLeft:16,paddingRight:16,paddingTop:8,paddingBottom:8}}
           onPress={()=>{
           setLogoutAlertStatus(false);
           userLogout();
           }}>
           <Text style = {{textAlign:'center',alignItems:"center",fontSize:16,color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium}}>
           {"Yes"}
           </Text>   
           </TouchableOpacity>
           </View> 
          </View>
          </View>
        </View>
      )}  

        <ScrollView contentContainerStyle = {{flexGrow:1,paddingBottom:insets.bottom + 60}}>   
        
        <View style = {{padding:4}}>

          <View style = {{marginLeft:10,marginTop:10,justifyContent:'center',flexDirection:'row'}}>
            <View style = {{width:64,height:64,borderRadius:30,backgroundColor:'#D3D3D3'}}>       
            </View>

            <View style = {{flex:1,marginLeft:15,marginTop:8}}>

            <Text style = {{color:'#180E25',fontSize:20}}>
             {userName} 
            </Text>

            <View style = {{flexDirection:'row'}}>
            <UserEmailIcon width={15} height={15} marginTop={6}>     
            </UserEmailIcon>
            <Text style = {{color:'#827D89',fontSize:12, marginTop:4,marginLeft:5}}>
              {userEmail}
            </Text>
            </View>

            </View>

          </View>

            <TouchableOpacity
            activeOpacity={1}
            style = {settingsLayoutStyle.touchableOpacityStyle}
            onPress={()=> navigation.navigate("EditProfileScreen")}
            >
             <View style = {settingsLayoutStyle.touchableOpacityView}>
              <EditProfileIcon width = {20} height = {20} marginEnd = {8} marginTop = {1}></EditProfileIcon>
             <Text style = {{color:"#6A3EA1",fontSize:16,textAlign:'center'}}>{"Edit Profile"}</Text>
             </View> 
            </TouchableOpacity>

            <View style = {settingsLayoutStyle.underLineView}>
            </View>

        <Text style = {{color:'#827D89',fontSize:10,marginTop:15,marginLeft:20}}>
         {"APP SETTINGS"} 
        </Text>

        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>navigation.navigate("ChangePasswordScreen")}>
         <View style = {{flexDirection:'row',marginTop:20,marginLeft:25,position:'relative'}}>
          <ChangePasswordIcon width = {24} height = {24}></ChangePasswordIcon>
          <Text style = {{color:'#180E25',fontSize:16,marginLeft:10,marginTop:1}}>{"Change Password"}</Text>
          <View style = {{flexDirection:'row',justifyContent:'center',right:0,position:'absolute'}}>
          <ChangePasswordArrow width = {16} height = {16} marginTop = {4} marginEnd = {7}></ChangePasswordArrow>
          </View>
         </View>
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>setShowLanguages(true)}>
         <View style = {{flexDirection:'row',marginTop:25,marginLeft:25,position:'relative'}}>
          <ChangeLanguageTranslation width = {24} height = {24}></ChangeLanguageTranslation>
          <Text style = {{color:'#180E25',fontSize:16,marginLeft:10,marginTop:1}}>{"Change Language"}</Text>
          <View style = {{flexDirection:'row',justifyContent:'center',right:0,position:'absolute'}}>
          <View style = {{marginEnd:5,marginTop:3.5}}>
          <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#827D89'}}>
          {selectedLanguageText}
          </Text>  
          </View>
          <ChangePasswordArrow width = {16} height = {16} marginTop = {4} marginEnd = {7}></ChangePasswordArrow>
          </View>
         </View>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={1}>
         <View style = {{flexDirection:'row',marginTop:30,marginLeft:25,position:'relative'}}>
          <TextSizeIcon width = {24} height = {24}></TextSizeIcon>
          <Text style = {{color:'#180E25',fontSize:16,marginLeft:10,marginTop:1}}>{"Text Size"}</Text>
          {/* <View style = {{flexDirection:'row',justifyContent:'center',right:0,position:'absolute'}}>
          <ChangePasswordArrow width = {16} height = {16} marginTop = {4} marginEnd = {7}></ChangePasswordArrow>
          </View> */}
         </View>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={1}>
         <View style = {{flexDirection:'row',marginTop:30,marginLeft:25,position:'relative'}}>
          <NotificationsIcon width = {24} height = {24}></NotificationsIcon>
          <Text style = {{color:'#180E25',fontSize:16,marginLeft:10,marginTop:1}}>{"Notifications"}</Text>
          {/* <View style = {{flexDirection:'row',justifyContent:'center',right:0,position:'absolute'}}>
          <ChangePasswordArrow width = {16} height = {16} marginTop = {4} marginEnd = {7}></ChangePasswordArrow>
          </View> */}
         </View>
        </TouchableOpacity>

        <View style = {settingsLayoutStyle.underLineView}>
        </View>    

        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>
        setLogoutAlertStatus(true)
        }
        >
         <View style = {{flexDirection:'row',marginTop:30,marginLeft:28,position:'relative'}}>
          <LogoutIcon width = {24} height = {24}></LogoutIcon>
          <Text style = {settingsLayoutStyle.logOutText}>{"Log Out"}</Text>
         </View>
        </TouchableOpacity>    

        </View>
        
        </ScrollView>

      </SafeAreaView>  

    );

};

const settingsLayoutStyle = StyleSheet.create({

  underLineView:{
    backgroundColor:'#EFEEF0',
    marginHorizontal:17,
    marginTop:30,
    borderWidth:0.2
  },

  touchableOpacityView:{
    flexDirection:'row',
    justifyContent:'center',
    position:'relative',
    },

    touchableOpacityStyle:{
        backgroundColor:'#FFFFFF',
        padding:5,
        borderWidth:1,
        borderColor:'#6A3EA1',
        marginTop:20,
        borderRadius:30,
        justifyContent:'center',
        marginHorizontal:15,
    },

    logOutText:{
      color:'#CE3A54',
      fontSize:16,
      marginLeft:10,
      fontFamily:fontFamilies.INTER.medium
    },

    logoutOverlayBg:{
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

    logoutContainerBg:{
      width:280,
      height:230,
      elevation:5,
      shadowColor:'#000',
      backgroundColor:'#FFFFFF',
      borderRadius:20
    },

    progressLoaderOverlayBg:{
      position:'absolute',
      top:0,
      bottom:0,
      right:0,
      left:0,
      justifyContent:'center',
      alignItems:'center',
      zIndex:999,
      backgroundColor:'rgba(0,0,0,0.3)'  
    },

    progressLoaderContainerBg:{
      width:100,
      height:100,
      backgroundColor:"#FFFFFF",
      borderRadius:10,
      elevation:5,
      shadowColor:'#000',
      shadowRadius:'4',
      shadowOpacity:0.3,
      shadowOffset: { width: 0, height: 2 },
      alignItems:'center',
      justifyContent:'space-evenly'
    }

});

export default SettingsScreen;