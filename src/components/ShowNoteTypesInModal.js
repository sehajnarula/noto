import React from "react";
import {View,Text} from "react-native";
import {fontFamilies} from "../constants/fonts";

const ShowNoteTypesInModal = props =>{
    return(
     <View style = {{marginTop:30,marginLeft:10}}>
      <Text style = {{fontFamily:fontFamilies.INTER.medium,color:'#180E25',fontSize:16}}>
      {props.noteTypeText}
      </Text>  
     </View>   
    );
};

export default ShowNoteTypesInModal;