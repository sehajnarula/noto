import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text} from "react-native";
import NoFinishedNotesIcon from "../../assets/images/nofinishednotesicon.svg";
import {fontFamilies} from "../constants/fonts";
import {firestore} from '../../firebaseconfig';
import {collection,getDocs} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import * as progress from 'react-native-progress';
import ViewNotesFlatList from "../components/ViewNotesFlatList";

const FinishedScreen = () =>{

    const finishedNotesMessage = "Once you create a note and finish it, it will be appeared on this screen. So, let’s start your journey!"
    const [finishedNotes,setFinishedNotes] = useState([]);
    const isFocused = useIsFocused(); 
    const [loading,setProgressLoading] = useState(false);
    const {user} = useContext(AuthContext);
    
    const getFinishedNotes = async(userId)=>{
        try {
          const notesSnapshot = await getDocs(collection(firestore,"notes"));
          const notesArray = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          }));
          const getFinishedNotes = notesArray.filter(notes=>notes.createdBy===userId && notes.isFinished==="finished");
          setFinishedNotes(getFinishedNotes);
          setProgressLoading(false);
        } catch (error) {
          setProgressLoading(false);
          console.log("fetchfinishnoteserror",error);
        }finally{
          setProgressLoading(false);
        }
    };

    useEffect(()=>{
      if(user.uid && isFocused){
        setProgressLoading(true);
        getFinishedNotes(user.uid);
      }
    },[isFocused,user.uid]);

    return(

      <SafeAreaView style = {{flex:1}}>

        {loading && (
          <View style = {finishedNotesLayoutStyle.progressLoaderOverlayBg}>
            <View style = {finishedNotesLayoutStyle.progressLoaderContainer}>
                <progress.Circle
                 indeterminate
                 size={50}
                 color="#6A3EA1"/> 
            </View>
          </View>
        )}

       <ScrollView contentContainerStyle = {{flexGrow:1}}>
       
       <View style = {{padding:4}}>

        {finishedNotes.length===0?(
          <View style = {{top:100,alignItems:'center',justifyContent:'space-between'}}>
          <NoFinishedNotesIcon width={240} height={240}></NoFinishedNotesIcon>
          <Text 
          style = {{fontSize:24,color:"#180E25",textAlign:'center',marginTop:20,fontFamily:fontFamilies.INTER.bold}}>
          {"No Finished Notes"}  
          </Text>
          <Text
          style={finishedNotesLayoutStyle.finishedNotesMessageStyle}>
          {finishedNotesMessage}  
          </Text>
         </View>
        ):(
           <View>
          <ViewNotesFlatList
          isHorizontal = {false}
          data = {finishedNotes}/>
           </View> 
        )}

       </View>
       
       </ScrollView>   

      </SafeAreaView>  

    );

};

const finishedNotesLayoutStyle = StyleSheet.create({

  finishedNotesMessageStyle:{
    fontSize:14,
    color:'#827D89',
    fontFamily:fontFamilies.INTER.regular,
    marginHorizontal:12,
    marginTop:10,
    textAlign:'center'
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      justifyContent:'center',
      alignItems:'center'
    },

});

export default FinishedScreen;