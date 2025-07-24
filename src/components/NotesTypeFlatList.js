import React from "react";
import {View,StyleSheet,FlatList,TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import NotesTypeFlatListLayout from "./NotesTypeFlatListLayout";

const NotesTypeFlatList = props =>{

    const navigation = useNavigation();

    return(
    
    <View style = {{flex:1}}>

     <FlatList 
     style = {{marginHorizontal:10, marginTop:5}}
     horizontal = {props.isHorizontal}
     showsHorizontalScrollIndicator = {false}
     showsVerticalScrollIndicator = {false}
     data = {props.noteTypeData}
     keyExtractor={noteTypes => noteTypes.noteType}
     renderItem={({item})=>(
      <TouchableOpacity
      onPress = {()=>navigation.navigate("CreateNewNoteScreen",{noteTypeImage:item.image,noteTypeText:item.noteType})}
      activeOpacity={0.9}>  
      <NotesTypeFlatListLayout
      sentNoteTypes = {item}>
      </NotesTypeFlatListLayout>  
      </TouchableOpacity>  
     )}>

     </FlatList>

    </View>

    );

};

export default NotesTypeFlatList;