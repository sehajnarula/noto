import React,{useEffect,useContext} from "react";
import {View,Text,Switch,TouchableOpacity} from "react-native";
import {fontFamilies} from "../constants/fonts";
import StoreInternalData from "../context/StoreInternalData";

const LanguageListLayout = props =>{

  const {setUserLanguageInStorage,getUserLanguageInStorage} = useContext(StoreInternalData);
  const islanguageSelected = props.sendLanguageData.languageCode === props.gotSelectedLanguage;

    return(
      <View>
      <View style = {{flexDirection:'row',position:'relative',marginTop:12}}>
      <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.medium,color:'#180E25',marginStart:5}}>
      {props.sendLanguageData.displayLanguageName}
      </Text>
      <Switch
      value = {islanguageSelected}
      onValueChange={()=>{
      props.onToggleChange(props.sendLanguageData.languageCode,props.sendLanguageData.displayLanguageName)
      }
      }
      style = {{position:'absolute',right:0}}
      thumbColor={islanguageSelected?"#6A3EA1":"#D3D3D3"}
      trackColor={{ false:"#D3D3D3",true:"#EFE9F7"}}
      //disabled = {true}
      />
      </View>
      </View>  
    );

};

export default LanguageListLayout;