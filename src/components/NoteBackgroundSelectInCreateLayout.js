import React from "react";
import {View,StyleSheet} from "react-native";

const NoteBackgroundSelectInCreateLayout = props =>{

    return(

        <View>
        <View
        style={{
          marginLeft: 18,
          width: 22,
          height: 22,
          borderRadius: 25,
          padding: 10,
          backgroundColor: props.sendNoteBgColor.bgColorSaved,
          borderWidth:2,
          borderColor: props.isSelected ? "#000000" : "#D3D3D3"
        }}>

        </View>
        </View>

    );

};

export default NoteBackgroundSelectInCreateLayout;