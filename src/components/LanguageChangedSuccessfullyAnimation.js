import React,{useState,useEffect,useContext,useRef} from "react";
import {View,Text,StyleSheet,Platform,Animated} from "react-native";
import StoreInternalData from "../context/StoreInternalData";
import {TranslateApi} from "../apicall/TranslateApi";
import {useIsFocused} from "@react-navigation/native";
import {fontFamilies} from "../constants/fonts";
import LottieView from 'lottie-react-native';

const LanguageChangedSuccessfullyAnimation = props =>{
  
  const {getUserLanguageInStorage} = useContext(StoreInternalData);
  const [languageName,setLanguageName] = useState("");
  const isFocused = useIsFocused();
  const [languageChangeMessage,setLanguageChangeMessage] = useState("");
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [textAnimation,setTextAnimation] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

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

  const getLanguage = async()=>{  
   const setLanguageFromStorage = await getUserLanguageInStorage();
   if(setLanguageFromStorage!==""){
    const savedLanguageInArray = sendLanguages.find(languages=>languages.languageCode===setLanguageFromStorage);
    setLanguageName(savedLanguageInArray.displayLanguageName);
    const englishMessage = `Language Changed Successfully`;
    if(setLanguageFromStorage!=="en"){
      try{
    const [languageCHangeMessageTranslated] = await Promise.all([
      TranslateApi(`Language Changed Successfully`,"en",setLanguageFromStorage)
    ]);
    setLanguageChangeMessage(languageCHangeMessageTranslated);
    }catch (error) {
      console.log(languageerrorinsuccessanimation,error)
    }
    }else{
      setLanguageChangeMessage(englishMessage);
    }
   }else{
    console.log("languageemptyerrorincompletion",error);
   } 
  };

  const fadeInTextAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    getLanguage();
    let fallbackTimer;
    if (Platform.OS === 'android') {
      fallbackTimer = setTimeout(() => {
        if (!textAnimation) {
          setTextAnimation(true);
          fadeInTextAnimation();
           if (props.onCompletion) {
            props.onCompletion();
          }
        }
      }, 5000);
   }
  return () => {
    if (fallbackTimer) clearTimeout(fallbackTimer);
  };
``},[]);

  const onLottieFinish = () => {
    setTextAnimation(true);
    fadeInTextAnimation();
  };

  return(

      <View style = {languageChangeAnimationStyle.languageChangeOverlayBg}>  
       <View style = {languageChangeAnimationStyle.lottieanimationbg}>
        {isLowEnd?(
          <Image
            source={require("../../assets/images/languagechangetickpur.gif")}
            style = {{width:150,height:150}}
            resizeMode="contain"
          />
        ):(
          <LottieView
            source={require("../../assets/animations/languagesaveticknewbg.json")}
            autoPlay
            loop={false}
            style={{width:200,height:200}}
            onAnimationFinish={() => {
            onLottieFinish();
            if (props.onCompletion) {
            setTimeout(() => {
            props.onCompletion();
            }, 5000);
            }
            }}
            />
        )}
       </View>
       {textAnimation&&(
        <Animated.Text style = {{textAlign:'center',marginTop:10,color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium,alignSelf:'center',fontSize:16,opacity:fadeAnim}}>
         {languageChangeMessage}   
        </Animated.Text>
       )} 
      </View>  

    );
};

const languageChangeAnimationStyle = StyleSheet.create({
    languageChangeOverlayBg:{
      position:'absolute',
      top:0,
      bottom:0,
      right:0,
      left:0,
      justifyContent:'center',
      alignItems:'center',
      zIndex:999,
      backgroundColor:'transparent'
      //backgroundColor:'rgba(0,0,0,0.3)'  
    },
    lottieanimationbg:{
      justifyContent:'center',
      alignItems:'center',
      padding:5
    }
});

export default LanguageChangedSuccessfullyAnimation;