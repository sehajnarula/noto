import React from "react";
import { SafeAreaView,View,ScrollView,Text,TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackArrow from '../../assets/images/backsearcharrow.svg';
import { fontFamilies } from "../constants/fonts";

const WeatherSettings = ()=>{

    const insets = useSafeAreaInsets();

    return(

      <SafeAreaView style = {{flex:1}}>
       <View style = {{flex:1,marginBottom:insets.bottom+30}}>
       <LinearGradient
       style = {{marginHorizontal:15,marginTop:15,paddingBottom:20,borderRadius:30,height:'100%'}}
       colors = {['#62B8F6','#2C79C1']}>
      <View style = {{flexDirection:'row',position:'relative'}}>
      <BackArrow width = {16} height = {16} marginTop = {20} marginLeft = {25}/>
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
      {"Settings"}  
      </Text>
    </View>
      </View>
       <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.medium,color:'#FFFFFF',marginLeft:20,marginTop:35}}>
        {"UNIT"}
       </Text>
       <View>
        <View style = {{flexDirection:'row',position:'relative',marginHorizontal:16,marginTop:25}}>
         <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"Temperature unit"}
         </Text>
         <Text style = {{position:'absolute',right:0,fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"°C"}
         </Text>                 
        </View>
        <View style = {{flexDirection:'row',position:'relative',marginHorizontal:16,marginTop:20}}>
         <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"Wind speed unit"}
         </Text>
         <Text style = {{position:'absolute',right:0,fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"km/h"}
         </Text>                 
        </View>        
        <View style = {{flexDirection:'row',position:'relative',marginHorizontal:16,marginTop:20}}>
         <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"Atmospheric pressure Unit"}
         </Text>
         <Text style = {{position:'absolute',right:0,fontSize:16,fontFamily:fontFamilies.INTER.regular,color:"#FFFFFF"}}>
         {"mbar"}
         </Text>                 
        </View> 
       </View>
      <View style = {{marginHorizontal:16,marginTop:40,borderWidth:0.6,borderColor:'#FFFFFF'}}>   
      </View>
       <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.medium,color:'#FFFFFF',marginLeft:13,marginTop:30}}>
        {"EXTRA"}
       </Text>
        <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF',marginLeft:15,marginTop:25}}>
        {"About"}
       </Text>
        <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF',marginLeft:15,marginTop:25}}>
        {"Privacy policy"}
       </Text>                    
       </LinearGradient>
       </View> 
      </SafeAreaView>  

    );

};

export default WeatherSettings;