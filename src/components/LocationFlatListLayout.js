import { View,StyleSheet,Text } from "react-native";
import { fontFamilies } from "../constants/fonts";
import HeavyRain from '../../assets/images/locationheavyrain.svg';

const LocationFlatListLayout = props =>{
    return(

      <View style = {{marginTop:10,width:'100%', backgroundColor:'#FFFFFF',height:85,borderRadius:10}}>
       <View style = {{flexDirection:'row',marginTop:20,position:'relative'}}>
       <View style = {{marginLeft:10}}>
       <Text style = {{fontFamily:fontFamilies.INTER.medium,color:'#1B2541',fontSize:16}}>
        {props.sendData.name}
       </Text>
       {/* <Text style = {{color:'#545B70',fontSize:12,fontFamily:fontFamilies.INTER.regular,marginTop:5}}>
        {props.sendData.temperature}
       </Text> */}
       </View>
       <View style = {{position:'absolute',right:0}}>
       {/* <HeavyRain width = {32} height = {32} left = {10}/> 
       <Text style = {{color:'#545B70',fontSize:12,fontFamily:fontFamilies.INTER.regular,marginRight:15}}>
        {props.sendData.rain}
       </Text>      */}
       </View> 
      </View> 
      </View>  

    );

};

export default LocationFlatListLayout;