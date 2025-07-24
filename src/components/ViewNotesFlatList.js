import React from "react";
import {View,StyleSheet,FlatList, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ViewNotesFlatListLayout from "./ViewNotesFlatListLayout";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ViewNotesFlatList = props =>{

const insets = useSafeAreaInsets();  
const navigation = useNavigation();    

  return(
    <View>
    <FlatList
    style = {{marginTop:8,marginBottom:insets.bottom+10,alignSelf:'center',marginEnd:10}}
    horizontal = {props.isHorizontal}
    showsHorizontalScrollIndicator = {false}
    numColumns={2}
    data={props.data}
    keyExtractor={notes=>notes.id}
    showsVerticalScrollIndicator = {false}
    renderItem={({item})=>(
        <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=>{
          navigation.navigate("UpdateNoteScreen",{noteTypeText:item.noteType,getNoteTitle:item.userDbNoteTitle,getNoteContent:item.userDbNoteContent,getNoteId:item.id})
        }}>
          <ViewNotesFlatListLayout
          notesData = {item}>
         </ViewNotesFlatListLayout>  
        </TouchableOpacity>
    )}>    
    </FlatList>        
    </View>
  );  

};

export default ViewNotesFlatList;