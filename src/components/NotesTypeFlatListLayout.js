import React from "react";
import {View,StyleSheet,Text,Image} from "react-native";
import {fontFamilies} from "../constants/fonts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const NotesTypeFlatListLayout = props =>{

return(

   <View style = {{flex:1,padding:12,backgroundColor:props.sentNoteTypes.backgroundColor,borderRadius:12,marginTop:25}}>
    
    <View style = {{flexDirection:'row',justifyContent:'center'}}>
    
     <View style = {{backgroundColor:props.sentNoteTypes.iconBgcolor,padding:10,marginEnd:12,borderRadius:25,justifyContent:'center',alignItems:'center'}}>
     {/* {props.sentNoteTypes.image}  */}
     <FontAwesomeIcon icon={props.sentNoteTypes.image} color="#FFFFFF" size={22}></FontAwesomeIcon> 
     </View>

     <View style = {{flex:1}}>

       <Text style = {{fontSize:16,color:props.sentNoteTypes.noteTypeColor,marginBottom:5}}>
        {props.sentNoteTypes.noteType}
       </Text>

        <Text style = {{fontSize:12,color:props.sentNoteTypes.noteUseTextColor}}>
        {props.sentNoteTypes.noteUse}
       </Text> 

     </View>

    </View>
    
   
   </View> 

);

};

export default NotesTypeFlatListLayout;