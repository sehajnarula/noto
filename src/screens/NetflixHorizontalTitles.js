import React,{useEffect,useState} from "react";
import { View,SafeAreaView,Text } from "react-native";
import {fontFamilies} from "../constants/fonts";
import axios from "axios";
import { NetflixOriginals } from "../apicall/NetflixOriginals";
import { useIsFocused } from "@react-navigation/native";
import HomeHorizontalTitlesFlatList from "../components/HomeHorizontalTitlesFlatList";

const NetflixHorizontalTitles = ()=>{
    
    const [getNetflixOriginals,setNetflixOriginals] = useState([]);
    const isFocused = useIsFocused();
    
    const getNetFlixOriginalTitles = async(apiKey)=>{
      const data = await NetflixOriginals(apiKey);
      setNetflixOriginals(data);  
    }

    useEffect(()=>{
        if(isFocused){
            getNetFlixOriginalTitles("6mvNWd9OiaEaPdKR2rLkY30Kj3CU0gTWHhwSOccN");
        }
    },[isFocused]);

    return(

        <SafeAreaView style = {{flex:1}}>
          <View style = {{flex:1}}>
          <Text style = {{fontFamily:fontFamilies.INTER.bold,includeFontPadding:false,fontSize:16,color:'#FFFFFF',marginLeft:12,marginTop:12}}>
          {"Netflix Originals"}
          </Text>
        <HomeHorizontalTitlesFlatList
        data = {getNetflixOriginals}
        isHorizontal = {true}/>             
          </View>  
        </SafeAreaView>

    );
};

export default NetflixHorizontalTitles;