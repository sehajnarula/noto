import React,{useState,useEffect} from "react";
import {View,StyleSheet,FlatList,TouchableOpacity,Text} from "react-native";
import CloseNoteLayoutDialog from '../../assets/images/closeiconcardbox.svg';
import SetReminderClock from '../../assets/images/reminderclock.svg';
import UpdateNoteType from '../../assets/images/changenotetypeicon.svg';
import GiveLabelTag from '../../assets/images/labeltag.svg';
import MarkFinishedIcon from '../../assets/images/markasfinishedcheck.svg';
import DeleteNoteTrash from '../../assets/images/deletenoteicon.svg';
import RightArrow from '../../assets/images/rightarrowforupdatenotebottomsheet.svg';
import {collection,doc,updateDoc,getDocs} from "firebase/firestore";
import {firestore} from '../../firebaseconfig';
import {fontFamilies} from "../constants/fonts";
import {useIsFocused} from "@react-navigation/native";
import SelectNotesColorBackground from "./SelectNotesColorBackground";
import Toast from "react-native-toast-message";

const NoteLayoutCardBox = props=>{

    const [dbNoteType,setDbNoteType] = useState("");
    const [dbIsFinished,setDbIsFinished] = useState("");
    const isFocused = useIsFocused();

    const fetchNoteDbData = async(noteIdMethod) =>{
              try {
              const noteSnapshot = await getDocs(collection(firestore,"notes"));
              const notesArray = noteSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));      
            const getNote = notesArray.find(notes=>notes.id===noteIdMethod);  
            if(getNote){
              setDbNoteType(getNote.noteType);
              setDbIsFinished(getNote.isFinished);
            } 
          } catch (error) {
                console.log("notedbfetcherror",error)
              }
          };

          const updateFinishedStatus = async (isFinishUpdateId,updateFinishStatusObject)=>{
            try {
                const documentReference = doc(firestore,"notes",isFinishUpdateId);
                await updateDoc(documentReference,updateFinishStatusObject)
                        .then(()=>{
                           Toast.show({
                            type:'success',
                            text1: 'Task is finished.',
                            autoHide: true,
                            position:'bottom',
                            visibilityTime: 3000,
                          });
                          setDbIsFinished("finished");
                        }).catch((error)=>{
                            Toast.show({
                            type:'error',
                            text1: 'Something Went Wrong.',
                            autoHide: true,
                            position:'bottom',
                            visibilityTime: 3000,
                          });     
                        });
            } catch (error) {
                console.log("updatefinishstatuserror",error);
            }
          };

     useEffect(()=>{
        if(isFocused && props.openNoteId){
           fetchNoteDbData(props.openNoteId);
        }
     },[isFocused,props.openNoteId]);     

    return(

        <View style = {noteLayoutBoxStyle.bottomSheetBg}>
        
        <View style = {noteLayoutBoxStyle.bottomSheetContainerBg}>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>props.closeModal()}>
        <View style = {{flexDirection:'row',marginTop:15,alignItems:'flex-end',justifyContent:'flex-end',marginEnd:15}}>
        <CloseNoteLayoutDialog width = {24} height = {24}></CloseNoteLayoutDialog>
        </View>            
        </TouchableOpacity>
        <Text style = {{fontSize:10,color:'#827D89',fontFamilies:fontFamilies.INTER.regular,marginTop:8,marginLeft:15}}>
         {"CHANGE BACKGROUND"}   
        </Text>
        <SelectNotesColorBackground
        colorArray = {props.colorBgArray}
        sendingNoteId = {props.openNoteId}
        isHorizontal = {true}>
        </SelectNotesColorBackground>

        <View style = {noteLayoutBoxStyle.underlineBelowColorBackgroundSelection}> 
        </View>
        <Text style = {{color:'#827D89',fontSize:10,fontFamily:fontFamilies.INTER.regular,marginTop:20,marginLeft:17}}>
         {"EXTRAS"}   
        </Text>
        <TouchableOpacity
        activeOpacity={1}>
        <View style = {{flexDirection:'row',marginTop:20,marginLeft:25,position:'relative'}}>
        <SetReminderClock width={24} height={24}/>
        <Text style = {{color:'#180E25',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10}}>{"Set Reminder"}</Text>
        <View style = {{flexDirection:'row',position:'absolute',right:0,justifyContent:'center',alignItems:'center',marginTop:1,marginEnd:5}}>
        <View>
         <Text style = {{color:'#827D89',fontSize:12,fontFamily:fontFamilies.INTER.regular}}>{"Not Set"}</Text>   
        </View>
        <RightArrow width={16} height={16}></RightArrow>    
        </View>
        </View>    
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}>
         <View style = {{flexDirection:'row',position:'relative',marginTop:25,marginLeft:25}}>
         <UpdateNoteType width = {24} height = {24}/>
         <Text style= {{color:'#180E25',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10}}>{"Change Note Type"}</Text>
        <View style = {{flexDirection:'row',position:'absolute',right:0,justifyContent:'center',alignItems:'center',marginTop:1,marginEnd:5}}>
        <View>
         <Text style = {{color:'#827D89',fontSize:12,fontFamily:fontFamilies.INTER.regular}}>{dbNoteType}</Text>   
        </View>
        <RightArrow width={16} height={16}></RightArrow>    
        </View> 
         </View>   
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}>
        <View style = {{flexDirection:'row',position:'relative',marginLeft:25,marginTop:25}}>
        <GiveLabelTag width={24} height = {24}/>
        <Text style= {{color:'#180E25',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10}}>{"Give Label"}</Text>
        <View style = {{flexDirection:'row',position:'absolute',right:0,marginTop:1,marginEnd:5}}>
        <View>
        <Text style = {{color:'#827D89',fontSize:12,fontFamily:fontFamilies.INTER.regular}}>{"Not Set"}</Text>      
        </View>
        <RightArrow width={16} height={16}/>
        </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{
            if(dbIsFinished==="incomplete"){
            const timestamp = new Date().toLocaleString();    
            updateFinishedStatus(props.openNoteId,{
                isFinished:"finished",
                updatedOn:timestamp
            });
            }else{
                Toast.show({
                    type:'error',
                    text1: 'Task is already completed.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                }); 
            }
        }}>
        <View style = {{flexDirection:'row',position:'relative',marginLeft:25,marginTop:25}}>
        <MarkFinishedIcon width={24} height = {24}/>
        <Text style= {{color:'#180E25',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10}}>{"Mark as Finished"}</Text>
        </View>
        </TouchableOpacity>
        <View style = {noteLayoutBoxStyle.underlineBelowColorBackgroundSelectionTwo}>
        </View>
        <TouchableOpacity
        activeOpacity={1}
        onPress={props.deleteNoteMethod}>
        <View style = {{flexDirection:'row',position:'relative',marginLeft:25,marginTop:25}}>
        <DeleteNoteTrash width={24} height = {24}/>
        <Text style= {{color:'#CE3A54',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10}}>{"Delete Note"}</Text>
        </View>
        </TouchableOpacity>
        </View>
        
        </View>

    );

};

const noteLayoutBoxStyle = StyleSheet.create({

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
        height:472,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        elevation:5,
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    underlineBelowColorBackgroundSelection:{
        backgroundColor:'#EFEEF0',
        marginHorizontal:15,
        borderWidth:0.2,
        marginTop:20
    },

    underlineBelowColorBackgroundSelectionTwo:{
        backgroundColor:'#EFEEF0',
        marginHorizontal:15,
        borderWidth:0.2,
        marginTop:20
    },

});

export default NoteLayoutCardBox;