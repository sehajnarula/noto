import React,{useState,useEffect} from "react";
import {View,StyleSheet,FlatList,TouchableOpacity} from "react-native";
import NoteBackgroundSelectInCreateLayout from "./NoteBackgroundSelectInCreateLayout";

const NoteBackgroundSelectInCreate = props=>{
    
  const [selectedColor,setSelectedColor] = useState(null);

  useEffect(()=>{
    if (props.sendColors && props.sendColors.length > 0) {
      // Set the first item as selected by default
      setSelectedColor(props.sendColors[0].bgColorSaved);
      props.getSelectedColor(props.sendColors[0].bgColorSaved);
    }
  },[]);

    return(

    <View style={{marginTop:10}}>
      <FlatList
      horizontal = {props.isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={props.sendColors}
      keyExtractor={colors =>colors.bgColorSaved}
      renderItem={({item})=>(
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{
          setSelectedColor(item.bgColorSaved)
          props.getSelectedColor(item.bgColorSaved)}}>
          <NoteBackgroundSelectInCreateLayout
            sendNoteBgColor={item}
            isSelected={item.bgColorSaved===selectedColor}>   
          </NoteBackgroundSelectInCreateLayout>
        </TouchableOpacity>
      )}>
     </FlatList>  
    </View>    

    );
};

export default NoteBackgroundSelectInCreate;