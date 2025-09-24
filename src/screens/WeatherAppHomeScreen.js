import React,{useState,useEffect} from "react";
import {View,SafeAreaView,ScrollView,Text,TouchableOpacity,Dimensions,Alert,StyleSheet} from "react-native";
import ThreeDotIcon from '../../assets/images/verticaldoticon.svg';
import PlusIcon from '../../assets/images/homeplusicon.svg';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {fontFamilies} from "../constants/fonts";
import Wind from '../../assets/images/windiconhome.svg';
import SmallCloud from '../../assets/images/smallcloud.svg';
import TemperatureIcon from '../../assets/images/temperaturehomeicon.svg';
import HumidityIcon from '../../assets/images/humidityhomeicon.svg';
import SevenDaysWeatherFlatList from "../components/SevenDaysWeatherFlatList";
import {useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import DownArrow from '../../assets/images/sevendayforecastarrow.svg';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedRef,useAnimatedScrollHandler,useSharedValue,runOnJS} from "react-native-reanimated";
import {checkMultiple, requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';
import LottieView from "lottie-react-native";
import GeoLocation from 'react-native-geolocation-service';
import axios from "axios";
import * as progress from 'react-native-progress';
import AsyncStorage from "@react-native-async-storage/async-storage";

const WeatherAppHomeScreen = ()=>{

    const insets = useSafeAreaInsets();
    const navigation = useNavigation(); 
    const { width } = Dimensions.get("window");
    const [deviceLocation,setDeviceLocation] = useState({latitude:null,longitude:null});
    const [currentWeather,setCurrentWeather] = useState(null);
    const [hourlyWeather,setHourlyWeather] = useState([]);
    const [presentRainChances,setPresentRainChances] = useState(0);
    const apiKey = '1783f58893d345b787841935251808';
    const [loading,setProgressLoading] = useState(false);
    const [aqi, setAqi] = useState(null);
    
    const getFormattedDate = () => {
      const today = new Date();
      const options = { weekday: "long", month: "short", day: "numeric" };
      return today.toLocaleDateString("en-US", options).replace(",", " |");
    };

  //   const getAqiMeter = (value) => {
  //     switch (value) {
  //     case 1: return "Good";
  //     case 2: return "Moderate";
  //     case 3: return "Unhealthy for Sensitive Groups";
  //     case 4: return "Unhealthy";
  //     case 5: return "Very Unhealthy";
  //     case 6: return "Hazardous";
  //     default: return "Unknown";
  // }
  // };

    const aqiProgressValue = aqi ? aqi / 6 : 0;

    const navigatePages = [{
      id:'1',
      cityName:'Malang',
      temperature:'20°,24°',
      rain:'Heavy rain'
    },{
      id:'2',
      cityName:'Banyuwangi',
      temperature:'20°,24°',
      rain:'Cloudy'
    },{
      id:'3',
      cityName:'Jakarta',
      temperature:'20°,24°',
      rain:'Sunny'
    },];

    const weatherAnimations = {
      "Heavy rain": require('../../assets/animations/rainycloud.json'),
      "Cloudy": require('../../assets/animations/movingclouds.json'),
      "Sunny": require('../../assets/animations/sunnyday.json'),
    };

    const flatListReference = useAnimatedRef(null);
    const scrollX = useSharedValue(0);
    const [currentPage,setPage] = useState(0);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x;
        const index = Math.round(event.contentOffset.x / width);
        runOnJS(setPage)(index);
      },
    });

    const isFocused = useIsFocused();

    const locationPermissionsArray = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ];
    
const handleLocationAccess = async () => {
  try {
    const statuses = await checkMultiple(locationPermissionsArray);

    const allGranted = locationPermissionsArray.every(
      permission => statuses[permission] === RESULTS.GRANTED
    );

    if (!allGranted) {
      const result = await requestMultiple(locationPermissionsArray);
      const allNowGranted = locationPermissionsArray.every(
        permission => result[permission] === RESULTS.GRANTED
      );

      if (!allNowGranted) {
        Alert.alert(
          "Permission Required",
          "Location access is required to use this feature.",
          [{text: "OK"}]
        );
        return;
      }
    }

    GeoLocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setDeviceLocation({ latitude, longitude });
        console.log("Latitude:", latitude, "Longitude:", longitude);
        setProgressLoading(true);
        try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`);
        const airQualityIndex = response.data.current.air_quality["us-epa-index"];
        setCurrentWeather(response.data);
        setAqi(airQualityIndex);
        console.log("weatherdata",response.data);
        } catch (error) {
        console.log("weatherdataerror",error);          
        }
        try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no`);
        setHourlyWeather(response.data.forecast.forecastday[0].hour); 
      } catch (error) {
          console.log("hourlyforecastapierror",error);
        }
        try{
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`);
        console.log("chancesofraindisplay",response.data.forecast.forecastday[0].day.daily_chance_of_rain);
        setPresentRainChances(response.data.forecast.forecastday[0].day.daily_chance_of_rain);  
      }catch(error){
          console.log("rainchanceserror",error);
        }
        setProgressLoading(false);  
      },
      error => {
        console.warn("Geolocation error:", error);
        Alert.alert("Error", "Failed to get current location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,           // time to fetch device location
        maximumAge: 10000,        // useful to fetch the same location via cache instead of fetching same location again and again
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );

  } catch (error) {
    console.warn("Permission check failed", error);
  }
 };    

    useEffect(()=>{
      if(isFocused){
        handleLocationAccess();
      }
    },[isFocused]);

    return(
      <SafeAreaView style = {{flex:1}}>
      {loading && (
        <View style = {weatherHomeStyle.progressLoaderOverlayBg}>
          <View style = {weatherHomeStyle.progressLoaderContainer}>
          <progress.Circle
          indeterminate
          size={50}
          color="#2C79C1"/>
          </View>
        </View>
      )}        
      <ScrollView contentContainerStyle = {{flexGrow:1}}>
      <View style = {{flex:1}}>
      <LinearGradient style = {{marginHorizontal:15,marginTop:15,borderRadius:30,paddingBottom:20}}
      colors = {['#62B8F6','#2C79C1']}>
      <View style = {{flexDirection:'row',position:'relative',marginTop:15}}>
      <TouchableOpacity
      activeOpacity={0.9}
      style = {{marginLeft:10}}
      onPress={()=>navigation.navigate("SearchLocation")}>
       <PlusIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      <View style = {{position:'absolute',right:0,left:0,alignItems: "center",justifyContent: "center"}}>
         {/* <Animated.FlatList
         data={navigatePages}
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item) => item.id}
         onScroll={scrollHandler}
         ref={flatListReference}
         renderItem={({item}) =>(
            <View style = {{width:width,alignItems:'center',justifyContent:'center'}}>
             <Text style = {{fontFamily:fontFamilies.INTER.medium,color:"#FFFFFF",fontSize:16,textAlign:'center',includeFontPadding:false}}>{item.cityName}</Text>   
            </View>
         )}>
         </Animated.FlatList> */}
         {/* <View style = {{flexDirection:'row',marginTop:10}}>
        {navigatePages.map((item, index) => (
        <View
        key={item.id}
        style={{
        height: 10,
        justifyContent:'center',
        alignItems:'center',
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        borderColor:'#FFFFFF',
        borderWidth:1,
        backgroundColor: currentPage === index ? "#FFFFFF" : "#62B8F6",
        }}/>
      ))}
      </View>          */}
      </View>
      <View style = {{position:'absolute',right:0,marginRight:5}}>
      <TouchableOpacity
      activeOpacity={1}>
       <ThreeDotIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      </View>  
      </View>
    <View style = {{justifyContent:'center',alignItems:'center',marginTop:30}}>
    <LottieView
      source={weatherAnimations[navigatePages[currentPage].rain]}
      autoPlay
      loop
      style={{width: 150,height: 150}}/>
      <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF',marginTop:5}}>
       {getFormattedDate()} 
      </Text>

      {currentWeather?(
        <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:72,color:'#FFFFFF',marginTop:5}}>
       {`${currentWeather.current.temp_c}°`} 
      </Text>
      ):(
      <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:72,color:'#FFFFFF',marginTop:5}}>
       {``} 
      </Text>       
      )
      }
      <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.regular,fontSize:16,color:'#FFFFFF',marginTop:5,includeFontPadding:false}}>
       {navigatePages[currentPage].rain} 
      </Text>
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
       <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.bold,fontSize:72,color:'#FFFFFF',marginTop:5}}>
       {``} 
      </Text>         
      )}
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {"Wind"}
      </Text>  
      </View>
      </View>
      <View style = {{position:'absolute',right:0,marginRight:8}}>
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
      </Text>
      ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {``}
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
      {``}
      </Text>
      )}
      {currentWeather?(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {`Humidity ${currentWeather.current.humidity} %`}
      </Text>  
      ):(
      <Text style = {{fontSize:12,fontFamily:fontFamilies.INTER.regular,color:'#FFFFFF'}}>
      {``}
      </Text>  
      )}
      </View>
      </View>
      </View>
      </View>
      </View>
      </LinearGradient>
      <View style = {{backgroundColor:'#2C79C1',marginTop:10,height:180,marginBottom:5}}>
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
<View style={{ backgroundColor: '#2C79C1', justifyContent:'center',alignItems:'center',height: 120, marginTop: 15, marginBottom: 5 }}>
  <Text style = {{fontSize:16,fontFamily:fontFamilies.INTER.medium,color:'#FFFFFF'}}>
    {"Air Quality Index"}
  </Text>
  <View style={{top:10, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    {aqi ? (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: fontFamilies.INTER.medium, fontSize: 16, color: '#FFFFFF', marginRight: 10 }}>
         {aqi}
        </Text>
        <progress.Bar
          progress={aqiProgressValue}
          width={150}
          color={aqi <= 2 ? "green" : aqi <= 4 ? "orange" : "red"}
          style={{ borderRadius: 10 }}
        />
      </View>
    ) : (
      <Text style={{ fontFamily: fontFamilies.INTER.medium, fontSize: 16, color: '#FFFFFF', marginTop: 15, marginLeft: 15 }}>
        {""}
      </Text>
    )}
    </View>
    </View>

      </View>
      </ScrollView>
      <View style = {{flexDirection:'column',marginBottom:insets.bottom+2}}>
      <TouchableOpacity
      activeOpacity={1}
      onPress={()=>navigation.navigate("SevenDays",{lat:deviceLocation.latitude,lon:deviceLocation.longitude})}>
      <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Text style = {{textAlign:'center',fontSize:16,fontFamily:fontFamilies.INTER.medium,color:'#2C79C1'}}>
      {"Forecast for 7 days"}
      </Text>
      <DownArrow width = {24} height = {24} marginTop = {2}/>
      </View>      
      </TouchableOpacity>      
      </View>  
      </SafeAreaView>  
    );
};

const weatherHomeStyle = StyleSheet.create({
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

export default WeatherAppHomeScreen;