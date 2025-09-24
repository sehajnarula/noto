import React,{useEffect,useState,useContext} from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text,TextInput} from "react-native";
import {fontFamilies} from "../constants/fonts";
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {firestore} from '../../firebaseconfig';
import {collection,getDocs} from "firebase/firestore";
import ViewNotesFlatList from "../components/ViewNotesFlatList";
import * as progress from 'react-native-progress';
import StartYourJourneyImage from "../../assets/images/startyourjourneyscreenimage.svg";
import SearchIcon from "../../assets/images/searchnotesinscreen.svg";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const SearchScreen = () =>{

  const{user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [loading,setProgressLoading] = useState(false);
  const [getAllNotes,setAllNotes] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const insets = useSafeAreaInsets();

  const getAllNotesById = async(userIdMethod)=>{
      try {
     const notesSnapshot = await getDocs(collection(firestore,"notes"));
     const notesArray = notesSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));
     const userNotesArray = notesArray.filter(notes=>notes.createdBy===userIdMethod);
     setAllNotes(userNotesArray);
     setProgressLoading(false);               
      } catch (error) {
        console.log("allnoteserror",error);
      }
  };

    const getAllNotesByIdAndSearch = async(userIdMethod,searchTermApi)=>{
      try {
     const notesSnapshot = await getDocs(collection(firestore,"notes"));
     const notesArray = notesSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));
     const userNotesArray = notesArray.filter(notes=>notes.createdBy===userIdMethod);
     setAllNotes(userNotesArray);
     setProgressLoading(false);               
      } catch (error) {
        console.log("allnoteserror",error);
      }
  };

  useEffect(()=>{
    if(isFocused && user.uid){
      setProgressLoading(true);
      getAllNotesById(user.uid);
    }
  },[isFocused,user.uid])

    return(

      <SafeAreaView style = {{flex:1}}>
      {loading && (
        <View style = {SearchStyle.progressLoaderOverlayBg}>
          <View style = {SearchStyle.progressLoaderContainer}>
          <progress.Circle
          indeterminate
          size={50}
          color="#6A3EA1"/>
          </View>
        </View>
      )}
        <ScrollView style = {{flexGrow:1}}>
         <View style = {{flex:1,padding:4}}>
          
          <View style = {SearchStyle.searchBarBg}>
            <SearchIcon style = {SearchStyle.iconStyle}/>
              {/* <TextInput
               autoCapitalize="none"
               autoCorrect = {false}
               placeholderTextColor={'#000000'}
               placeholder={"Search"}
               onChangeText={search=>setSearchTerm(search)}
               value={searchTerm}
               style = {{marginStart:5,flex:1,color:'#000000',fontFamily:fontFamilies.INTER.regular}}
               onEndEditing={() => {
                  if(searchTerm===""){
                  setProgressLoading(true);  
                  getAllNotesById(user.uid);
                }else{
               const searchTermArray = getAllNotes.filter(notes =>
               (notes.userDbNoteTitle && notes.userDbNoteTitle.includes(searchTerm)) ||
               (notes.userDbNoteContent && notes.userDbNoteContent.includes(searchTerm))
              );
              setAllNotes(searchTermArray);
             }
            }}></TextInput> */}

              <TextInput
               autoCapitalize="none"
               autoCorrect = {false}
               placeholderTextColor={'#000000'}
               placeholder={"Search"}
               onChangeText={(search)=>{
                setSearchTerm(search);
                const searchTermRegEx = new RegExp(search.trim(),"i");
                if(search.trim()===""){
                  setProgressLoading(true); 
                  getAllNotesById(user.uid);
                }else{
                  const searchTermArray = getAllNotes.filter(notes =>
                  (notes.userDbNoteTitle && searchTermRegEx.test(notes.userDbNoteTitle)) ||
                  (notes.userDbNoteContent && searchTermRegEx.test(notes.userDbNoteContent))
                );
                setAllNotes(searchTermArray);
              }
               }
              }
               value={searchTerm}
               style = {{marginStart:5,flex:1,color:'#000000',fontFamily:fontFamilies.INTER.regular}}>
               </TextInput>

          </View>

        {getAllNotes.length===0?(
        <View style = {{top:120,alignItems:'center',justifyContent:'center'}}>
        <StartYourJourneyImage width = {240} height = {240}></StartYourJourneyImage>
        <Text style = {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:24,color:'#180E25',marginTop:7}}>
        {"No Notes Saved"}
        </Text>
        </View>
        ):(
          <View>
          <ViewNotesFlatList
          isHorizontal = {false}
          data = {getAllNotes}/>
           </View> 
        )}
        </View>   
        </ScrollView>

      </SafeAreaView>  

    );

};

const SearchStyle = StyleSheet.create({
  
  searchBarBg:{
    borderRadius:10,
    backgroundColor:'#D3D3D3',
    padding:8,
    marginTop:10,
    marginHorizontal:9,
    marginBottom:8,
    flexDirection:'row'
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

    iconStyle:{
      fontSize:35,
    }

});

export default SearchScreen;