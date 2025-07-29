import React,{useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreInternalData = React.createContext();

export const StoreInternalDataProvider = ({children})=>{

    const [loginUser,setLoginUser] = useState("");
    const[savedUser,setSavedUser] = useState("");
    const [userLanguage,setUserLanguage] = useState("en");

    const saveUserToken = async(userAccessToken)=>{
         try {
            setLoginUser(userAccessToken);
            await AsyncStorage.setItem("userinfo",userAccessToken);
            await AsyncStorage.setItem("userloginstatus",JSON.stringify(true));
         } catch (error) {
            console.log("savingusererror",error);
         }   
    };

    const getUserToken = async()=>{
        try {
            const savedUserInMemory = await AsyncStorage.getItem("userinfo");
            if(savedUserInMemory!==null){
              setSavedUser(savedUserInMemory);
            }
        } catch (error) {
            console.log("usergeterror",error);
        }
    };

    const removeUserToken = async()=>{
        try {
          await AsyncStorage.removeItem("userinfo")
          await AsyncStorage.setItem("userloginstatus",JSON.stringify(false));  
          setSavedUser(null); 
        } catch (error) {
            console.log("userremoveerror",error);
        }
    };

    const setUserLanguageInStorage = async(languageCode)=>{
        try {
          await AsyncStorage.setItem("userselectedlanguage",languageCode);
          setUserLanguage(languageCode);
        } catch (error) {
          console.log("getlanguageerror",JSON.stringify(error));
        }
    };


const getUserLanguageInStorage = async () => {
  try {
    const lang = await AsyncStorage.getItem("userselectedlanguage");
    if (lang !== null) {
      setUserLanguage(lang);
      return lang;
    } else {
      await AsyncStorage.setItem("userselectedlanguage", "en");
      setUserLanguage("en");
      return "en";
    }
  } catch (error) {
    console.log("getlanguageerror", JSON.stringify(error));
    return "en";
  }
 };

    return(

      <StoreInternalData.Provider value={{data:savedUser,loginUser,saveUserToken,removeUserToken,getUserToken,setUserLanguageInStorage,getUserLanguageInStorage,userLanguage}}>
        {children}
      </StoreInternalData.Provider>

    );

};

export default StoreInternalData;