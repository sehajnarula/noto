import React from "react";
import {View,StyleSheet,TouchableOpacity,Text} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CloseNoteLayoutDialog from '../../assets/images/closeiconcardbox.svg';
import PinnedNoteIconDisplay from "../../assets/images/notepinnedicon.svg";
import {fontFamilies} from "../constants/fonts";

const PinnedNoteBottomSheet = props =>{

    const insets = useSafeAreaInsets();
    const pinnedSuccessFullyMessage = "Notes Pinned Successfully";
    const pinnedScreenMessage = "The note will be displayed on the pinned section";
    const closeModal = "Close";

    return( 
      <View style = {PinnedNoteStyle.bottomSheetBg}>
      <View style = {PinnedNoteStyle.bottomSheetContainerBg}>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>props.closeModal()}>
        <View style = {{flexDirection:'row',marginTop:15,alignItems:'flex-end',justifyContent:'flex-end',marginEnd:15}}>
        <CloseNoteLayoutDialog width = {24} height = {24}></CloseNoteLayoutDialog>
        </View>            
        </TouchableOpacity>
        <View style = {{alignItems:'center',justifyContent:'center',top:10}}>
        <PinnedNoteIconDisplay width = {160} height = {160}/>
        </View>
        <View style = {{justifyContent:'center',alignItems:'center',marginTop:20}}>
        <Text style = {{fontSize:20,color:'#180E25',fontFamily:fontFamilies.INTER.bold,textAlign:'center',alignItems:'center'}}>
         {pinnedSuccessFullyMessage}   
        </Text>
        <Text style = {{fontSize:16,color:'#827D89',fontFamily:fontFamilies.INTER.regular,textAlign:'center',alignItems:'center',marginTop:6,marginHorizontal:20}}>
         {pinnedScreenMessage}   
        </Text>
        <TouchableOpacity
        style = {{backgroundColor:'#6A3EA1',paddingTop:8,paddingBottom:8,paddingLeft:16,paddingRight:16,borderRadius:20,marginTop:20}}
        activeOpacity={0.9}
        onPress={()=>props.closeModal()}>
        <Text style = {{textAlign:'center',fontSize:16,alignItems:'center',color:'#FFFFFF',fontFamily:fontFamilies.INTER.medium}}>
        {closeModal}
        </Text>    
        </TouchableOpacity>
        </View>
      </View>  
      </View>  
    );
};

const PinnedNoteStyle = StyleSheet.create({

    bottomSheetBg:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        right:0,
        bottom:0,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'flex-end',
    },

    bottomSheetContainerBg:{
        backgroundColor:'#FFFFFF',
        width:"100%",
        height:390,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        elevation:5,
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

});

export default PinnedNoteBottomSheet;