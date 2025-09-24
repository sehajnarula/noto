import React from "react";
import { View,FlatList,StyleSheet } from "react-native";
import SevenDayForecastFlatListLayout from "./SevenDayForecastFlatListLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SevenDayForecastFlatList = props =>{
    
   const insets = useSafeAreaInsets(); 

    return(

     <View style = {{marginHorizontal:15,marginBottom:insets.bottom+30}}>
     <FlatList
     horizontal = {props.isHorizontal}
     showsHorizontalScrollIndicator = {false}
     showsVerticalScrollIndicator = {false}
     data= {props.data}
     keyExtractor={conditions=>conditions.date}
     renderItem={({item})=>(
     <SevenDayForecastFlatListLayout
     sendData = {item}/>
     )}/>   
     </View>   

    );

};

export default SevenDayForecastFlatList;