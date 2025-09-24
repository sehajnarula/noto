import React from "react";
import { View, Text,Image } from "react-native";
import { fontFamilies } from "../constants/fonts";

const SevenDayForecastFlatListLayout = (props) => {
 
  return (
    <View style={{marginTop:10}}>
      <View style={{flexDirection:"row",position:"relative",width:"100%"}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily:fontFamilies.INTER.medium,
            color: "#FFFFFF",
          }}>
          {props.sendData.date}
        </Text>
        <View style={{position: "absolute",right: 0}}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontFamilies.INTER.regular,
              color: "#FFFFFF",
            }}>
            {props.sendData.day.avgtemp_c}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}>
        <View style = {{flexDirection:'row'}}>
        <Image source={{uri: "https:" + props.sendData.day.condition.icon}} width = {24} height = {24}/>
        <Text style={{
              textAlign: "center",
              fontSize: 12,
              marginLeft:5,
              marginTop:5,
              fontFamily: fontFamilies.INTER.regular,
              color: "#FFFFFF",
            }}>
            {`${props.sendData.day.daily_chance_of_rain}%`}
          </Text>
        </View>    
        </View>
      </View>
    </View>
  );
};

export default SevenDayForecastFlatListLayout;