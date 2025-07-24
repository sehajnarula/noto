import React from "react";
import {View,StyleSheet,ScrollView,SafeAreaView,Text} from "react-native";
import NoFinishedNotesIcon from "../../assets/images/nofinishednotesicon.svg";
import {fontFamilies} from "../constants/fonts";

const FinishedScreen = () =>{

    const finishedNotesMessage = "Once you create a note and finish it, it will be appeared on this screen. So, let’s start your journey!"

    return(

      <SafeAreaView style = {{flex:1}}>

       <ScrollView contentContainerStyle = {{flexGrow:1}}>
       
       <View style = {{padding:4}}>

         <View style = {{top:100,alignItems:'center',justifyContent:'space-between'}}>
          <NoFinishedNotesIcon width={240} height={240}></NoFinishedNotesIcon>
          <Text 
          style = {{fontSize:24,color:"#180E25",textAlign:'center',marginTop:20}}>
          {"No Finished Notes"}  
          </Text>
          <Text
          style={finishedNotesLayoutStyle.finishedNotesMessageStyle}>
          {finishedNotesMessage}  
          </Text>
         </View>

       </View>
       
       </ScrollView>   

      </SafeAreaView>  

    );

};

const finishedNotesLayoutStyle = StyleSheet.create({

  finishedNotesMessageStyle:{
    fontSize:14,
    color:'#827D89',
    //fontFamily:fontFamilies.INTER.regular,
    marginHorizontal:12,
    marginTop:10,
    textAlign:'center'
  }

});

export default FinishedScreen;