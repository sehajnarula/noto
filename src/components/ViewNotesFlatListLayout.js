import React from "react";
import {View,StyleSheet,Text,Dimensions} from "react-native";
import{faLightbulb} from '@fortawesome/free-solid-svg-icons';
import{faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import{faClipboard} from '@fortawesome/free-solid-svg-icons';
import{faClipboardList} from '@fortawesome/free-solid-svg-icons';
import{faMagic} from '@fortawesome/free-solid-svg-icons';
import {fontFamilies} from "../constants/fonts";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ViewNotesFlatListLayout = (props)=>{  

  const entireScreenWidth = Dimensions.get("window").width;
  const noteDisplayWidth = (entireScreenWidth - 3 * 16)/2;

  const switchNoteIcon = (type) => {
    switch (type) {
      case "Interesting Idea":
        return faLightbulb;
      case "Buying Something":
        return faShoppingCart;
      case "Goals":
        return faMagic;
      case "Guidance":
        return faClipboardList;
      case "Routine Tasks":
        return faClipboard;
      default:
        return null;
    }
  };

  const noteIcon = switchNoteIcon(props.notesData.noteType)

    return(

      <View style = {{
      width:noteDisplayWidth,
      borderRadius: 12,
      marginLeft:7,
      marginTop:7,
      marginBottom:15,
      backgroundColor:props.notesData.dbBackgroundColor,
      shadowColor: '#000',// shadow for iOS
      elevation: 3,// shadow for android
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
       }}>

    <View style={ViewStyle.noteTitleStyle}>
        <FontAwesomeIcon icon={noteIcon} size={20} color="gold" style={ViewStyle.iconStyle} />
        <Text style={ViewStyle.titleText}>
          {props.notesData.userDbNoteTitle}
        </Text>
      </View>

      {/* Description */}
      <Text style={ViewStyle.descriptionText}>
        {props.notesData.userDbNoteContent}
      </Text>

      {/* Footer */}
      <View style={ViewStyle.noteTypeBg}>
        <Text style={ViewStyle.noteTypeTextStyle}>{props.notesData.noteType}</Text>
      </View>

       </View>

    );

};

const ViewStyle = StyleSheet.create({
  noteTitleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconStyle: {
    marginRight: 6,
  },
  titleText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: fontFamilies.INTER.medium,
    flexShrink: 1,
  },
  descriptionText: {
    fontSize: 12,
    color: '#3A3A3C',
    paddingHorizontal:10,
    paddingBottom:10,
    fontFamily: fontFamilies.INTER.regular,
  },
  noteTypeBg: {
    backgroundColor: '#EFEEF0',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  noteTypeTextStyle: {
    fontSize: 12,
    color: '#6E6E73',
    fontFamily: fontFamilies.INTER.medium,
  },
});

export default ViewNotesFlatListLayout;