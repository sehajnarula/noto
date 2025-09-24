import React,{useState,useEffect} from "react";
import {View,SafeAreaView,ScrollView,Text,TouchableOpacity,StyleSheet} from "react-native";
import ThreeDotIcon from '../../assets/images/verticaldoticon.svg';
import PlusIcon from '../../assets/images/homeplusicon.svg';
import CloudIcon from '../../assets/images/homesuncloudicon.svg';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {fontFamilies} from "../constants/fonts";
import Wind from '../../assets/images/windiconhome.svg';
import SmallCloud from '../../assets/images/smallcloud.svg';
import TemperatureIcon from '../../assets/images/temperaturehomeicon.svg';
import HumidityIcon from '../../assets/images/humidityhomeicon.svg';
import SevenDaysWeatherFlatList from "../components/SevenDaysWeatherFlatList";
import SevenDayForecastFlatList from "../components/SevenDayForecastFlatList";
import LinearGradient from "react-native-linear-gradient";
// import LottieView from "lottie-react-native";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";
import * as progress from 'react-native-progress';

const SevenDaysWeatherScreen = ({route})=>{

    const {lat,lon} = route.params;
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const [deviceLocation,setDeviceLocation] = useState({latitude:null,longitude:null});
    const [currentWeather,setCurrentWeather] = useState(null);
    const [hourlyWeather,setHourlyWeather] = useState([]);    
    const [sevenDayWeather,setSevenDayWeather] = useState([]);    
    const apiKey = '1783f58893d345b787841935251808';
    const [presentRainChances,setPresentRainChances] = useState(0);
    const [loading,setProgressLoading] = useState(false);

    const getFormattedDate = () => {
      const today = new Date();
      const options = { weekday: "long", month: "short", day: "numeric" };
      return today.toLocaleDateString("en-US", options).replace(",", " |");
    };

    const currentWeatherApi = async (latitude,longitude)=>{
        try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`);
        setCurrentWeather(response.data);
        console.log("weatherdata",response.data);
        } catch (error) {
        console.log("weatherdataerror",error);          
        } 
    };
    
    const hourlyWeatherApi = async(latitude,longitude)=>{
        try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no`);  
        setHourlyWeather(response.data.forecast.forecastday[0].hour); 
      } catch (error) {
          console.log("hourlyforecastapierror",error);
        }
    };

    const setSevenDaysForecastApi = async(latitude,longitude)=>{
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=no`
        );
        console.log("showsevendayforecast",response.data.forecast.forecastday)
        setSevenDayWeather(response.data.forecast.forecastday || []);
      } catch (error) {
        console.log("sevendayforecastapierror:", error);
      } 
    };

    const getPresentRainChances = async(latitude,longitude)=>{
        try{
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`);
        console.log("chancesofraindisplay",response.data.forecast.forecastday[0].day.daily_chance_of_rain);
        setPresentRainChances(response.data.forecast.forecastday[0].day.daily_chance_of_rain);  
      }catch(error){
          console.log("rainchanceserror",error);
        }
    };      

    useEffect(()=>{
    if(isFocused){
      setProgressLoading(true);
      currentWeatherApi(lat,lon);
      hourlyWeatherApi(lat,lon);
      setSevenDaysForecastApi(lat,lon);
      getPresentRainChances(lat,lon);
      setProgressLoading(false);
    }
    },[isFocused])

    return(

     <SafeAreaView style = {{flex:1}}>
      {loading && (
              <View style = {SevenDayStyleSheet.progressLoaderOverlayBg}>
                <View style = {SevenDayStyleSheet.progressLoaderContainer}>
                <progress.Circle
                indeterminate
                size={50}
                color="#2C79C1"/>
                </View>
              </View>
            )}  
     <ScrollView contentContainerStyle = {{flexGrow:1}}>
     <View style = {{flex:1}}>
     <LinearGradient style = {{borderRadius:30,marginHorizontal:15,marginTop:10,paddingBottom:20}}
     colors={['#62B8F6','#2C79C1']}>
      <View style = {{flexDirection:'row',position:'relative',marginTop:15}}>
      <TouchableOpacity
      activeOpacity={1}
      style = {{marginLeft:10}}>
       <PlusIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      <View style = {{position:'absolute',right:0,marginRight:5}}>
      <TouchableOpacity
      activeOpacity={1}>
       <ThreeDotIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      </View>  
      </View>
      <View style = {{flexDirection:'row',marginHorizontal:12}}>
      <CloudIcon width = {160} height = {160}/>
      <View>
      <Text style= {{fontFamily:fontFamilies.INTER.regular,fontSize:16,color:'#FFFFFF',marginTop:5,marginLeft:5}}>
       {getFormattedDate()} 
      </Text>
      {currentWeather?(
        <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:60,color:'#FFFFFF',marginTop:5}}>
       {`${currentWeather.current.temp_c}°`} 
      </Text>        
      ):(
        <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:72,color:'#FFFFFF',marginTop:5}}>
       {``} 
      </Text>        
      )}
    <Text style= {{fontFamily:fontFamilies.INTER.regular,fontSize:16,color:'#FFFFFF',marginTop:5,marginLeft:5}}>
       {"Heavy Rain"} 
      </Text>        
      </View>  
      </View>
      <View style = {{marginHorizontal:16,marginTop:15,borderWidth:0.6,borderColor:'#FFFFFF'}}>   
      </View>
      <View style = {{marginHorizontal:20,marginTop:10}}>
      <View style = {{flexDirection:'row',position:'relative'}}>
      <View style = {{flexDirection:'row'}}>
      <Wind width = {32} height = {32} marginTop = {5}/>
      <View style = {{marginTop:5,marginLeft:5}}>
      {currentWeather?(
        <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`${currentWeather.current.wind_kph} kph`}
      </Text>
      ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {``}
      </Text>        
      )}
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {"Wind"}
      </Text>  
      </View>
      </View>
      <View style = {{position:'absolute',right:0,marginRight:5}}>
      <View style = {{flexDirection:'row'}}>
      <SmallCloud width = {32} height = {32} marginTop = {5}/>
      <View style = {{marginTop:5,marginLeft:5}}>
      {presentRainChances?(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`${presentRainChances}%`}
      </Text>
      ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {``}
      </Text>        
      )}
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {"Chances of rain"}
      </Text>  
      </View>
      </View>
      </View>
      </View>
      <View style = {{flexDirection:'row',position:'relative',marginTop:5}}>
      <View style = {{flexDirection:'row'}}>
      <TemperatureIcon width = {32} height = {32} marginTop = {5}/>
      <View style = {{marginTop:5,marginLeft:5}}>
      {currentWeather?(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`${currentWeather.current.pressure_mb}`}
      </Text>):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`No Live Value Of Pressure`}
      </Text>        
      )}
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {"Pressure"}
      </Text>  
      </View>
      </View>
      <View style = {{position:'absolute',right:0,marginRight:12,}}>
      <View style = {{flexDirection:'row'}}>
      <HumidityIcon width = {32} height = {32} marginTop = {5}/>
      <View style = {{marginTop:5,marginLeft:5}}>
      {currentWeather?(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`${currentWeather.current.humidity}%`}
      </Text>        
      ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`No humidity value`}
      </Text>
      )}
      {currentWeather?(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`Humidity ${currentWeather.current.humidity}%`}
      </Text> ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {"No Humidity Value"}
      </Text>         
      )}
      </View>
      </View>
      </View>
      </View>
      </View>     
     </LinearGradient>
      <View style = {{backgroundColor:'#2C79C1',marginTop:10,height:150,marginBottom:5}}>
      <Text style= {{fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF',marginTop:15,marginLeft:15}}>
       {getFormattedDate()} 
      </Text>
      {hourlyWeather.length===0?(
      <Text style= {{fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF',marginTop:15,marginLeft:15}}>
       {"Unable to get hourly weather."} 
      </Text>
      ):(
      <SevenDaysWeatherFlatList
      isHorizontal = {true}
      data = {hourlyWeather}/>        
      )}  
      </View>      
     </View>
     </ScrollView>
     <View style = {{          
        position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius:2,
          borderBottomRightRadius:2,
          backgroundColor: '#2C79C1',
          height: 180,
          paddingBottom:10}}>

      <Text style = {{color:'#FFFFFF',fontSize:16,fontFamily:fontFamilies.INTER.medium,marginLeft:10,marginTop:10}}>
      {"Forecast for 7 days"}
      </Text>  
      {sevenDayWeather!==0?(
      <SevenDayForecastFlatList
      isHorizontal = {false}
      data = {sevenDayWeather}>
     </SevenDayForecastFlatList>         
      ):(
      <Text style= {{fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF',marginTop:15,marginLeft:15}}>
       {"Unable to get weekly weather."} 
      </Text>        
      )}
     </View>
     </SafeAreaView>   

    );

};

const SevenDayStyleSheet = StyleSheet.create({
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

export default SevenDaysWeatherScreen;