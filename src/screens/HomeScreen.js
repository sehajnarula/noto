import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text} from "react-native";
import StartYourJourneyImage from "../../assets/images/startyourjourneyscreenimage.svg";
import {fontFamilies} from "../constants/fonts";
import {AuthContext} from "../context/AuthContext";
import {firestore} from '../../firebaseconfig';
import {useIsFocused} from "@react-navigation/native";
import {doc} from 'firebase/firestore';
import {collection,getDocs} from "firebase/firestore";
import ViewNotesFlatList from "../components/ViewNotesFlatList";
import * as progress from 'react-native-progress';

const HomeScreen = () =>{

 const textAfterStartJourney = "Every big step start with small step. Note your first idea and start your journey!";   
 const [savedNotes,setSavedNotes] = useState([]);
 const {user} = useContext(AuthContext);
 const [loading,setProgressLoading] = useState(false);
 const isFocused = useIsFocused();

 const getNotesById = async(userId)=>{
  try {
    const notesSnapshot = await getDocs(collection(firestore,"notes"));
    const notesArray = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    const userNotesArray = notesArray.filter(notes=>notes.createdBy===userId);
    setSavedNotes(userNotesArray);
    setProgressLoading(false);
  } catch (error) {
    setProgressLoading(false);
    console.log("fetchnoteserror",error);
  }finally{
    setProgressLoading(false);
  }
 };

 useEffect(()=>{
  if(user.uid && isFocused){
    setProgressLoading(true);
    getNotesById(user.uid);
  }
 },[user.uid,isFocused]);

    return(

      <SafeAreaView style = {{flex:1}}>

      {loading && (
        <View style = {homeScreenStyle.progressLoaderOverlayBg}>
          <View style = {homeScreenStyle.progressLoaderContainer}>
          <progress.Circle
          indeterminate
          size={50}
          color="#6A3EA1"/>
          </View>
        </View>
      )}

       <ScrollView contentContainerStyle = {{flexGrow:1}}>
       
       <View style = {{flex:1,padding:4}}>

        {savedNotes.length===0?(
        <View style = {{top:120,alignItems:'center',justifyContent:'center'}}>
        <StartYourJourneyImage width = {240} height = {240}></StartYourJourneyImage>
        <Text style = {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:24,color:'#180E25',marginTop:7}}>
        {"Start Your Journey"}
        </Text>
        <Text style = {{textAlign:'center',fontFamily:fontFamilies.INTER.regular,color:'#827D89',fontSize:14,marginTop:10,marginHorizontal:15}}>{textAfterStartJourney}</Text>
        </View>
        ):(
          <View>
          <ViewNotesFlatList
          isHorizontal = {false}
          data = {savedNotes}/>
           </View> 
        )}

       </View>
       
       </ScrollView> 

      </SafeAreaView>  

    );

};

const homeScreenStyle = StyleSheet.create({
    
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },

})

export default HomeScreen;