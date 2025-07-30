import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,SafeAreaView,TextInput,Text,ScrollView,TouchableOpacity} from "react-native";
import {useIsFocused,useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {firestore} from "../../firebaseconfig";
import{addDoc,collection} from 'firebase/firestore';
import {fontFamilies} from "../constants/fonts";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Toast from "react-native-toast-message";
import Arrow from '../../assets/images/arrowright.svg';
import * as progress from 'react-native-progress';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MlCameraIcon from "../../assets/images/camera.svg"
import NoteBackgroundSelectInCreate from "../components/NoteBackgroundSelectInCreate";

const CreateNewNote = ({route})=>{

    const{noteTypeImage,noteTypeText} = route.params;
    const [noteTitle,setNoteTitle] = useState("");
    const [noteContent,setNoteContent] = useState("");
    const [bgColorOnScreenDb,setBgColorOnScreenDb] = useState("");
    const navigation = useNavigation();
    const {user} = useContext(AuthContext)
    const [userId,setUserId] = useState("");
    const isFocused = useIsFocused();
    const [loading,setProgressLoading] = useState(false);
    const insets = useSafeAreaInsets();
    const notesBgColorList = [{bgColorSaved:'#FFFFFF'},{bgColorSaved:'#F7DEE3'},{bgColorSaved:'#EFE9F7'},{bgColorSaved:'#DAF6E4'},{bgColorSaved:'#FDEBAB'},{bgColorSaved:'#F7F6D4'},{bgColorSaved:'#EFEEF0'}];

   useEffect(()=>{
    if(isFocused && user.uid){
      setUserId(user.uid);
    }
  },[isFocused]);

  const addNote = async(saveUserId,userNoteTitle,userNoteContent,noteCreationDate,typeOfNote,noteBackgroundColor,isFinishedStatus)=>{
    try {
      await addDoc(collection(firestore,"notes"),{
      createdBy:saveUserId,
      userDbNoteTitle:userNoteTitle,
      userDbNoteContent:userNoteContent,
      createdOn:noteCreationDate,
      updatedOn:noteCreationDate,
      noteType:typeOfNote,
      isFinished:isFinishedStatus,
      dbBackgroundColor:noteBackgroundColor
    });
    setNoteTitle("");
    setNoteContent("");
    setProgressLoading(false);
    Toast.show({
    type:'success',
    text1: 'Note Saved Successfully.',
    autoHide: true,
    position:'bottom',
    visibilityTime: 3000,
    });   
    } catch (error) {
      console.log("savenoteerror",error);
      setProgressLoading(false);
    }finally{
      setProgressLoading(false);
    }
  };

    return(
      <SafeAreaView style = {{flex:1,backgroundColor:bgColorOnScreenDb}}>
        
        {loading && (
          <View style = {noteCreationStyle.progressLoaderOverlayBg}>
          <View style = {noteCreationStyle.progressLoaderContainer}>
            <progress.Circle
            indeterminate
            size={50}
            color="#6A3EA1"/>  
          </View>
        </View>
        )}
        
        <ScrollView contentContainerStyle = {{flexGrow:1}}>
         <View style = {{flex:1,padding:4}}>

          <View style = {{flexDirection:'row',alignItems:'center',position:'relative',marginTop:15,marginBottom:10,marginLeft:5}}>
            <View style={{ position: 'absolute', left: 10, top: 20 }}>
            <FontAwesomeIcon icon={noteTypeImage} size={24} color="gold" />
            </View>
          <View style = {{alignItems:'center',flexDirection:'row',marginHorizontal:20}}>
          <TextInput
           autoCapitalize="none"
           autoCorrect={false}
           multiline = {true}
           style = {noteCreationStyle.noteTitleTextInput}
           placeholder="Enter Note Title"
           placeholderTextColor={"#C8C5CB"}
           onChangeText={(value)=>setNoteTitle(value)}
           value={noteTitle}>
           </TextInput>
          </View>
          <View style = {{position:'absolute',right:10,top:20.5}}>
           <TouchableOpacity
           activeOpacity={1}>
            <MlCameraIcon width = {24} height = {24}/> 
           </TouchableOpacity>
          </View>
          </View>

          <Text style = {{fontSize:10,color:'#827D89',fontFamilies:fontFamilies.INTER.regular,marginTop:8,marginLeft:15}}>
           {"SELECT BACKGROUND"}   
          </Text>

          <NoteBackgroundSelectInCreate
          sendColors = {notesBgColorList}
          isHorizontal = {true}
          getSelectedColor = {setBgColorOnScreenDb}>
          </NoteBackgroundSelectInCreate>

         <View style = {{marginTop:20,marginBottom:20}}>
          <TextInput style = {noteCreationStyle.noteContentTextInput}
           autoCapitalize="none"
           autoCorrect={false}
           placeholder="Enter Note Content"
           multiline = {true}
           placeholderTextColor={"#474747ff"}
           onChangeText={(value)=>setNoteContent(value)}
           value={noteContent}>
          </TextInput>
         </View> 
         </View>   
        </ScrollView>

        <View style = {{flexDirection:"column",marginBottom:insets.bottom+10}}>
          <TouchableOpacity
          style = {noteCreationStyle.createNoteTouchableOpacity}
          activeOpacity={0.9}
          onPress={()=>{
            if(noteTitle===""){
              Toast.show({
                type:'error',
                text1: 'Enter Note Title.',
                autoHide: true,
                position:'bottom',
                visibilityTime: 3000,
                });
            }else if(noteContent===""){
               Toast.show({
                type:'error',
                text1: 'Enter Note Content.',
                autoHide: true,
                position:'bottom',
                visibilityTime: 3000,
                });
            }else{
              setProgressLoading(true);
              const timestamp = new Date().toLocaleString();
              addNote(userId,noteTitle,noteContent,timestamp,noteTypeText,bgColorOnScreenDb,"incomplete");
            }
          }}>

          <View style = {noteCreationStyle.createNoteTouchableOpacityViewStyle}>
           <Text style = {{flex:1,color:'#FFFFFF',textAlign:'center',fontSize:16,fontFamily:fontFamilies.INTER.medium}}>
           {"Save Note"}
           </Text>
           <Arrow position = {'absolute'} right = {0} marginTop = {2}>
           </Arrow>
          </View>
          </TouchableOpacity>
        </View>

      </SafeAreaView>  

    );

};

const noteCreationStyle = StyleSheet.create({

    noteTitleTextInput:{
      fontSize:32,
      marginHorizontal:20,
      fontFamily:fontFamilies.INTER.bold,
      color: '#000000',
      paddingRight:40
    },

    progressLoaderOverlayBg:{
       position:'absolute',
       top:0,
       bottom:0,
       right:0,
       left:0,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor: 'rgba(0,0,0,0.3)',
       zIndex: 999
    },

    progressLoaderContainer:{
      elevation:5,
      shadowColor:'#000',
      borderRadius:10,
      backgroundColor:'#FFFFFF',
      width:100,
      height:100,
      shadowOffset: {width:0,height:2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },

    noteContentTextInput:{
      fontSize:16,
      marginHorizontal:12,
      color:"#827D89",
      fontFamily:fontFamilies.INTER.regular
    },

    createNoteTouchableOpacity:{
        backgroundColor:'#6A3EA1',
        padding:14,
        marginTop:20,
        borderRadius:30,
        justifyContent:'center',
        marginHorizontal:15,
    },

    createNoteTouchableOpacityViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        position:'relative',
    },

});

export default CreateNewNote;