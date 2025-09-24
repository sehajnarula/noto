import React from "react";
import {View,StyleSheet,FlatList,TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import LocationFlatListLayout from "./LocationFlatListLayout";
import { useNavigation } from "@react-navigation/native";

const LocationFlatList = props =>{

  const navigation = useNavigation();

    return(

      <View style = {{marginTop:10,marginHorizontal:15}}>
      <FlatList
      horizontal = {props.isHorizontal}
      showsHorizontalScrollIndicator = {false}
      showsVerticalScrollIndicator = {false}
      data = {props.data}
      keyExtractor={(city, index) => city.id?.toString() || index.toString()}
      renderItem={({item})=>(
      <TouchableOpacity
      activeOpacity={1}
      onPress={()=>navigation.navigate("LocationWeatherDisplay",{latitude:item.lat,longitude:item.lon})}>
      <LocationFlatListLayout
        sendData = {item}/> 
      </TouchableOpacity>  
      )}
      />  
      </View>  

    );

};

export default LocationFlatList;