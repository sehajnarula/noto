import React from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView} from "react-native";
import {fontFamilies} from "../constants/fonts";
import NotesTypeFlatList from "../components/NotesTypeFlatList";
import IdeaLightBulb from "../../assets/images/lightbulb.svg";
import ShoppingCart from "../../assets/images/shoppingcart.svg";
import GoalsSparkles from "../../assets/images/sparkles.svg";
import GuidanceClipBoard from "../../assets/images/clipboardlist.svg";
import TasksClipboard from "../../assets/images/clipboard.svg";
import{faLightbulb} from '@fortawesome/free-solid-svg-icons';
import{faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import{faClipboard} from '@fortawesome/free-solid-svg-icons';
import{faClipboardList} from '@fortawesome/free-solid-svg-icons';
import{faMagic} from '@fortawesome/free-solid-svg-icons';

const NewNote = () =>{

    const newNotePrompt= "What Do You Want to Note?"
    
    const notesTypeArray = [
        {
        backgroundColor:'#6A3EA1',
        image:faLightbulb,    
        noteType:'Interesting Idea',
        noteUse:"Use free text area, feel free to write it all",
        noteTypeColor:'#FFFFFF',
        noteUseTextColor:'#FFFFFF',
        iconBgcolor:'#3A2258'
        },
        {
        backgroundColor:'#60D889',
        image:faShoppingCart,    
        noteType:'Buying Something',
        noteUse:"Use checklist, so you won't miss anything",
        noteTypeColor:'#FFFFFF',
        noteUseTextColor:'#000000',
        iconBgcolor:'#1F7F40'
        },
        {
        backgroundColor:'#F8C715',
        image:faMagic,    
        noteType:'Goals',
        noteUse:"Near/future goals, notes and keep focus",
        noteTypeColor:'#FFFFFF',
        noteUseTextColor:'#000000',
        iconBgcolor:'#725A03'
        },
        {
        backgroundColor:'#CE3A54',  
        image:faClipboardList,    
        noteType:'Guidance',
        noteUse:"Create guidance for routine activities",
        noteTypeColor:'#FFFFFF',
        noteUseTextColor:'#FFFFFF',
        iconBgcolor:'#5A1623'
        },
        {
        backgroundColor:'#DEDC52',  
        image:faClipboard,    
        noteType:'Routine Tasks',
        noteUse:"Checklist with sub-checklist",
        noteTypeColor:'#FFFFFF',
        noteUseTextColor:'#000000',
        iconBgcolor:'#565510'
        }];

    return(

        <SafeAreaView style = {{flex:1}}>
          
          <ScrollView contentContainerStyle = {{flexGrow:1}}>
          
            <View style = {{flex:1,padding:4}}>
            
             <Text style = {newNoteScreenStyle.newNotePromptText}>  
              {newNotePrompt}  
             </Text>

            <NotesTypeFlatList
            isHorizontal = {false}
            noteTypeData = {notesTypeArray}>
            </NotesTypeFlatList>              

            </View>  
          
          </ScrollView>      
        
        </SafeAreaView>

    );

};

export default NewNote;

const newNoteScreenStyle = StyleSheet.create({

   newNotePromptText:{
    fontFamily:fontFamilies.INTER.bold,
    fontSize:24,
    marginTop:20,
    marginHorizontal:8
   }, 
    
});