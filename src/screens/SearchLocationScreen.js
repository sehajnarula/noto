import React,{useState} from "react";
import { View,StyleSheet,SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackArrow from '../../assets/images/backsearcharrow.svg';
import {fontFamilies} from "../constants/fonts";
import SearchLocation from '../../assets/images/searchlocationicon.svg';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationFlatList from "../components/LocationFlatList";
import axios from "axios";

  const SearchLocationScreen = ()=>{

    const [getLocationFromUser,setLocationFromUser] = useState("");
    const insets = useSafeAreaInsets();
    const apiKey = '1783f58893d345b787841935251808';
    const [locationDetails,setLocationDetails] = useState([]);  

  const searchLocationApi = async (searchTerm) => {
    try {
      if (!searchTerm || searchTerm.length < 2) {
      setLocationDetails([]);
      return;
    }
    const response = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
    );
    setLocationDetails(response.data);
    console.log("Search Results:", response.data);
  } catch (error) {
    console.log("searchLocationApiError", error);
  }
};

    return (

      <SafeAreaView style = {{flex:1,backgroundColor:'#FFFFFF'}}>
      <ScrollView contentContainerStyle = {{flexGrow:1}}>
      <View style = {{flex:1,padding:4,marginBottom:insets.bottom+30}}>
      <LinearGradient style = {{marginHorizontal:15,marginTop:15,paddingBottom:20,borderRadius:30,height:'100%'}}
        colors = {['#62B8F6','#2C79C1']}>
      <View style = {{flexDirection:'row',position:'relative'}}>
      <BackArrow width = {16} height = {16} marginTop = {20} marginLeft = {15}/>
      <View style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  marginTop:15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
      <Text style = {{fontFamily:fontFamilies.INTER.bold,fontSize:16,color:'#FFFFFF',textAlign:'center'}}>
      {"Manage Location"}  
      </Text>
              </View>

      </View>      
      <View style = {{borderRadius:20,backgroundColor:'#D3D3D3',flexDirection:'row',marginHorizontal:15,marginTop:15}}>
      <SearchLocation width = {16} height = {16}
      marginTop = {12} marginLeft = {10}/>   
              <TextInput
               autoCapitalize="none"
               autoCorrect = {false}
               placeholderTextColor={'#000000'}
               placeholder={"Search Your City"}
               onChangeText={(search)=>{
                setLocationFromUser(search);
                const searchTermRegEx = new RegExp(search.trim(),"i");
                searchLocationApi(searchTermRegEx);
               }
              }
               value={getLocationFromUser}
               style = {{marginStart:5,flex:1,color:'#000000',fontFamily:fontFamilies.INTER.regular}}>
               </TextInput>      
      </View>
      <LocationFlatList
      isHorizontal = {false}
      data = {locationDetails}>

      </LocationFlatList>
      </LinearGradient>  
      </View>
      </ScrollView>  
      </SafeAreaView>  

    );

};

export default SearchLocationScreen;