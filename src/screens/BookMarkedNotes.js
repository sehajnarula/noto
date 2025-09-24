import React,{useState,useEffect,useContext} from "react";
import {View,SafeAreaView,ScrollView,Text,StyleSheet} from "react-native";
import {fontFamilies} from "../constants/fonts";
import {firestore} from '../../firebaseconfig';
import {collection,getDocs} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import * as progress from 'react-native-progress';
import PinnedNoteIconDisplay from "../../assets/images/notepinnedicon.svg";
import ViewNotesFlatList from "../components/ViewNotesFlatList";

const BookMarkedNotes = ()=>{
    
    const bookmarkedNotesMessage = "Once you bookmark a note, it will appear on this screen. So bookmark a note."
    const [loading,setProgressLoading] = useState(false);
    const [bookmarkedNotes,setBookMarkedNotes] = useState([]);
    const {user} = useContext(AuthContext);
    const isFocused = useIsFocused();

    const getBookmarkedNotes = async(userId)=>{
            try {
              const notesSnapshot = await getDocs(collection(firestore,"notes"));
              const notesArray = notesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
              }));
              const getFinishedNotes = notesArray.filter(notes=>notes.createdBy===userId && notes.isBookmarked===true);
              setBookMarkedNotes(getFinishedNotes);
              setProgressLoading(false);
            } catch (error) {
              setProgressLoading(false);
              console.log("fetchfinishnoteserror",error);
            }finally{
              setProgressLoading(false);
            }
        };

    useEffect(()=>{
      if(isFocused && user.uid){
        setProgressLoading(true);
        getBookmarkedNotes(user.uid);
      }  
    },[isFocused,user.uid]);    
    
    return(
        
      <SafeAreaView style = {{flex:1}}>
        {loading && (
         <View style = {BookMarkedNotesStyle.progressLoaderOverlayBg}>
         <View style = {BookMarkedNotesStyle.progressLoaderContainer}>
         <progress.Circle
            indeterminate
            size={50}
            color="#6A3EA1"/> 
            </View>
           </View>
               )} 
       <ScrollView style = {{flexGrow:1}}>
        <View style = {{padding:4}}>
        {bookmarkedNotes.length===0?(
          <View style = {{top:100,alignItems:'center',justifyContent:'space-between'}}>
          <PinnedNoteIconDisplay width={240} height={240}></PinnedNoteIconDisplay>
          <Text 
          style = {{fontSize:24,color:"#180E25",textAlign:'center',marginTop:20,fontFamily:fontFamilies.INTER.bold}}>
          {"No Bookmarked Notes"}  
          </Text>
          <Text
          style={BookMarkedNotesStyle.bookmarkedNotesMessageStyle}>
          {bookmarkedNotesMessage}  
          </Text>
         </View>
        ):(
           <View>
          <ViewNotesFlatList
          isHorizontal = {false}
          data = {bookmarkedNotes}/>
           </View> 
        )}
        </View>
       </ScrollView> 
      </SafeAreaView>  

    );
};

const BookMarkedNotesStyle = StyleSheet.create({
  
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

    bookmarkedNotesMessageStyle:{
    fontSize:14,
    color:'#827D89',
    fontFamily:fontFamilies.INTER.regular,
    marginHorizontal:12,
    marginTop:10,
    textAlign:'center'
  },
    
    progressLoaderContainer:{
      elevation:5,
      shadowColor:'#000',
      borderRadius:10,
      backgroundColor:'#FFFFFF',
      width:100,
      height:100,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },
});

export default BookMarkedNotes;