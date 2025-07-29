import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,SafeAreaView,TextInput,Text,Image,ScrollView,TouchableOpacity,BackHandler} from "react-native";
import {useIsFocused,useNavigation} from "@react-navigation/native";
import {firestore} from "../../firebaseconfig";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Toast from "react-native-toast-message";
//import Arrow from '../../assets/images/arrowright.svg';
import HorizontalDotsToOpenBottomSheet from '../../assets/images/dotshorizontalfornoteupdate.svg';
import BookMark from '../../assets/images/bookmarknote.svg';
import SearchInNote from '../../assets/images/searchinupdatescreen.svg';
import {fontFamilies} from "../constants/fonts";
import {collection,getDocs} from "firebase/firestore";
import {doc,updateDoc,deleteDoc} from "firebase/firestore";
import{faLightbulb} from '@fortawesome/free-solid-svg-icons';
import{faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import{faClipboard} from '@fortawesome/free-solid-svg-icons';
import{faClipboardList} from '@fortawesome/free-solid-svg-icons';
import{faMagic} from '@fortawesome/free-solid-svg-icons';
import * as progress from 'react-native-progress';
import NoteLayoutCardBox from "../components/NoteLayoutCardBox";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Modal from 'react-native-modal';
import moment from 'moment';

const UpdateNote = ({route})=>{  

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const{noteTypeText,getNoteTitle,getNoteContent,getNoteId} = route.params;
    const [noteTitle,setNoteTitle] = useState("");
    const [getNoteType,setNoteType] = useState("");
    const [noteContent,setNoteContent] = useState("");
    const [getLastUpdateDate,setLastUpdateDate] = useState("");
    const [loading,setProgressLoading] = useState(false);
    const [noteLayoutBox,setNoteLayoutBox] = useState(false);
    const insets = useSafeAreaInsets();
    const [dbBgColor, setDbBgColor] = useState("");
    const updateNoteTimestamp = new Date().toLocaleString();

    const notesBgColorList = [{bgColorSaved:'#FFFFFF'},{bgColorSaved:'#F7DEE3'},{bgColorSaved:'#EFE9F7'},{bgColorSaved:'#DAF6E4'},{bgColorSaved:'#FDEBAB'},{bgColorSaved:'#F7F6D4'},{bgColorSaved:'#EFEEF0'}];

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

    const setNoteTypeIcon = switchNoteIcon(noteTypeText);

    const lastEditedMomentDate = (timeStamp)=>{
      const getMoment = moment();
      const savedTimeStamp = moment(timeStamp,'M/D/YYYY, h:mm:ss A'); //saveddbformat
      const isToday = getMoment.isSame(savedTimeStamp,'day'); //checking if the saved value is of present day or not
      const formatted = isToday
      ?`Last edited on ${savedTimeStamp.format('h:mm A')}`
      :`Last edited on ${savedTimeStamp.format('D MMMM YYYY, h:mm A')}`;
      return formatted;
    };
  
    const fetchNoteById = async (noteIdMethod) => {
    try {
      const noteSnapshot = await getDocs(collection(firestore, "notes"));
      const notesArray = noteSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const getNote = notesArray.find(note => note.id === noteIdMethod);
      if (getNote) {
        setDbBgColor(getNote.dbBackgroundColor);
        setLastUpdateDate(getNote.updatedOn);
      }
      setProgressLoading(false);
    } catch (error) {
      setProgressLoading(false);
      console.log("notedbfetcherror", error);
    }
  };

  useEffect(()=>{
      if(isFocused){
        setNoteTitle(getNoteTitle);
        setNoteContent(getNoteContent);
        setProgressLoading(true);
        fetchNoteById(getNoteId);
      }
  const backAction = () => {
    if (noteLayoutBox) {
      setNoteLayoutBox(false);
      return true;
    }
    return false;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );
  return () => backHandler.remove();
  },[isFocused]);

    const updateNote = async(updateNoteId,updatedData)=>{
      setProgressLoading(true)
      try {
        const documentReference = doc(firestore,"notes",updateNoteId);
        await updateDoc(documentReference,updatedData).then(()=>{
            Toast.show({
                  type:'success',
                  text1: 'Note Updated Successfully.',
                  autoHide: true,
                  position:'bottom',
                  visibilityTime: 3000,
                  });
                  setProgressLoading(false);
                  setNoteTitle(noteTitle);
                  setNoteContent(noteContent);
                  setLastUpdateDate(updateNoteTimestamp);
                    }).catch((error)=>{
                        Toast.show({
                            type:'error',
                            text1: 'Unable to update',
                            autoHide: true,
                            position:'bottom',
                            visibilityTime: 3000,
                          });
                          setProgressLoading(false);
                  });
      }catch (error) {
        setProgressLoading(false);
        console.log("updatenoteerror",error);
      }finally{
        setProgressLoading(false);
      }  
    };

    const deleteNote = async(deleteNoteIdMethod)=>{
      try {
        const documentReference = doc(firestore,"notes",deleteNoteIdMethod);
        await deleteDoc(documentReference).then(()=>{
            Toast.show({
             type:'success',
             text1: 'Note Deleted Successfully.',
             autoHide: true,
             position:'bottom',
             visibilityTime: 3000,
            }); 
        setProgressLoading(false); 
        navigation.goBack();  
      }).catch((error)=>{
             Toast.show({
              type:'error',
              text1: 'Unable to delete',
              autoHide: true,
              position:'bottom',
              visibilityTime: 3000,
            });
         setProgressLoading(false); 
        });
      } catch (error) {
        console.log("deletemethoderror",error);
      } finally{
        setProgressLoading(false); 
      }
    };

    return(

       <SafeAreaView style = {{flex:1,backgroundColor:dbBgColor}}>
        
        {loading&&(
          <View style = {updateNoteLayout.progressLoaderOverlayBgStyle}>
           <View style = {updateNoteLayout.progressLoaderContainerBg}>
            <progress.Circle
            indeterminate
            size={50}
            color="#6A3EA1"/>
           </View> 
          </View>
        )}

      <Modal
      isVisible={noteLayoutBox}
      onBackdropPress={() => setNoteLayoutBox(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: 'flex-end' }}
      >
      <NoteLayoutCardBox
      colorBgArray={notesBgColorList}
      openNoteId={getNoteId}
      deleteNoteMethod={() => deleteNote(getNoteId)}
      updateNoteMethod = {() => updateNote(getNoteId,{
            userDbNoteTitle:noteTitle,
            userDbNoteContent:noteContent,
            updatedOn:updateNoteTimestamp
      }
      )}
      updateTimeWhenFinished = {setLastUpdateDate}
      updateBgColorInScreenDb = {setDbBgColor}
      closeModal={() => setNoteLayoutBox(false)}
      />
      </Modal>
        
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style = {{flex:1,padding:4}}>
                  <View style = {{flexDirection:'row',alignItems:'center',position:'relative',marginTop:15,marginBottom:10,marginLeft:5}}>
                  <View style = {{alignItems:'center',flexDirection:'row',marginHorizontal:3}}>
                  <FontAwesomeIcon icon={setNoteTypeIcon} size = {32} color="gold"></FontAwesomeIcon>
                  <TextInput
                   autoCapitalize="none"
                   autoCorrect={false}
                   multiline = {true}
                   style = {updateNoteLayout.noteTitleTextInput}
                   placeholder="Enter Note Title"
                   placeholderTextColor={"#C8C5CB"}
                   onChangeText={(value)=>setNoteTitle(value)}
                   value={noteTitle}> 
                   </TextInput>
                  </View>
                  </View>        
                 <View style = {{marginTop:20,marginBottom:20}}>
                  <TextInput style = {updateNoteLayout.noteContentTextInput}
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
          <View style = {{flexDirection:"column",marginBottom:insets.bottom+1,width:"100%",height:48,backgroundColor:"#FFFFFF"}}>
          <View style = {{flexDirection:'row',position:'relative'}}>
          <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#000000',top:15,marginStart:5}}>
          {lastEditedMomentDate(getLastUpdateDate)}
          </Text>
          <View style = {{flexDirection:'row',position:'absolute',right:0}}>
          <TouchableOpacity
          activeOpacity={1}>
          <SearchInNote width = {24} height={24} marginEnd={15} top = {10}/> 
          </TouchableOpacity> 
          <TouchableOpacity
          activeOpacity={1}>
          <BookMark width = {24} height={24} marginEnd={15} top={10}/>  
          </TouchableOpacity>
          <View style = {{width:48,height:48,top:0.8}}>
          <TouchableOpacity 
          style = {{backgroundColor:'#6A3EA1',padding:12,justifyContent:'center',alignItems:'center'}}
          activeOpacity={0.9}
          onPress={()=>setNoteLayoutBox(true)}>
           <HorizontalDotsToOpenBottomSheet width = {24} height={24}/> 
          </TouchableOpacity>
          </View>
          </View>
          </View>
          </View>
        </ScrollView>

       </SafeAreaView> 

    );

};

const updateNoteLayout = StyleSheet.create({

    progressLoaderOverlayBgStyle:{
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

    progressLoaderContainerBg:{
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },

    noteTitleTextInput:{
      fontSize:32,
      marginHorizontal:20,
      fontFamily:fontFamilies.INTER.bold,
      color: '#000000',
    },

    noteContentTextInput:{
      fontSize:16,
      marginHorizontal:12,
      color:"#827D89",
      fontFamily:fontFamilies.INTER.regular
    },

    updateNoteTouchableOpacity:{
        backgroundColor:'#6A3EA1',
        padding:14,
        marginTop:20,
        borderRadius:30,
        justifyContent:'center',
        marginHorizontal:15,
    },

    updateNoteTouchableOpacityViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        position:'relative',
    },

});

export default UpdateNote;