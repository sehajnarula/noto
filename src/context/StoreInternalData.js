import React,{useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreInternalData = React.createContext();

export const StoreInternalDataProvider = ({children})=>{

    const [loginUser,setLoginUser] = useState("");
    const[savedUser,setSavedUser] = useState("");

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

    return(

      <StoreInternalData.Provider value={{data:savedUser,loginUser,saveUserToken,removeUserToken,getUserToken}}>
        {children}
      </StoreInternalData.Provider>

    );

};

export default StoreInternalData;