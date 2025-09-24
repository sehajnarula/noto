import React,{useState,useEffect} from "react";
import {View,SafeAreaView,ScrollView,Text,TouchableOpacity,Dimensions,Alert,StyleSheet} from "react-native";
import axios from "axios";
import {fontFamilies} from "../constants/fonts";
import {useIsFocused,useNavigation} from "@react-navigation/native";
import DownArrow from '../../assets/images/sevendayforecastarrow.svg';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedRef,useAnimatedScrollHandler,useSharedValue,runOnJS} from "react-native-reanimated";
import Wind from '../../assets/images/windiconhome.svg';
import SmallCloud from '../../assets/images/smallcloud.svg';
import TemperatureIcon from '../../assets/images/temperaturehomeicon.svg';
import HumidityIcon from '../../assets/images/humidityhomeicon.svg';
import SevenDaysWeatherFlatList from "../components/SevenDaysWeatherFlatList";
import ThreeDotIcon from '../../assets/images/verticaldoticon.svg';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import PlusIcon from '../../assets/images/homeplusicon.svg';
import * as progress from 'react-native-progress';

const SpecificLocationWeather = ({route})=>{
    
    const {latitude,longitude} = route.params;
    const apiKey = '1783f58893d345b787841935251808';
    const [currentWeather,setCurrentWeather] = useState(null);
    const [hourlyWeather,setHourlyWeather] = useState([]);
    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets();
    const [presentRainChances,setPresentRainChances] = useState(0);
    const navigation = useNavigation();
    const [loading,setProgressLoading] = useState(false);
    const [aqi, setAqi] = useState(null);
    
    const getFormattedDate = () => {
      const today = new Date();
      const options = { weekday: "long", month: "short", day: "numeric" };
      return today.toLocaleDateString("en-US", options).replace(",", " |");
    };

    const getPresentWeather = async(lat,long)=>{
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=yes`);
        const airQualityIndex = response.data.current.air_quality["us-epa-index"];        
        setCurrentWeather(response.data);
        setAqi(airQualityIndex);
        console.log("weatherdata",response.data);
        }catch (error) {
        console.log("weatherdataerror",error);          
        }
    };

    const getHourlyWeatherForecast = async(lat,long)=>{
        try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=1&aqi=yes&alerts=no`);
        setHourlyWeather(response.data.forecast.forecastday[0].hour); 
      } catch (error) {
          console.log("hourlyforecastapierror",error);
        }
    };

    const getPresentRainChances = async(lat,long)=>{
        try{
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=1&aqi=yes&alerts=yes`);
        console.log("chancesofraindisplay",response.data.forecast.forecastday[0].day.daily_chance_of_rain);
        setPresentRainChances(response.data.forecast.forecastday[0].day.daily_chance_of_rain);  
      }catch(error){
          console.log("rainchanceserror",error);
        }
    };    

    useEffect(()=>{
     if(isFocused){
        setProgressLoading(true);
        getPresentWeather(latitude,longitude);
        getHourlyWeatherForecast(latitude,longitude);
        getPresentRainChances(latitude,longitude);
        setProgressLoading(false);
     }
    },[isFocused])

    const aqiProgressValue = aqi ? aqi / 6 : 0;

    return(
      <SafeAreaView style = {{flex:1}}>
      {loading && (
        <View style = {LocationWeatherStyle.progressLoaderOverlayBg}>
          <View style = {LocationWeatherStyle.progressLoaderContainer}>
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
      activeOpacity={1}
      style = {{marginLeft:10}}
      onPress={()=>navigation.navigate("SearchLocation")}>
       <PlusIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      {/* <View style = {{position:'absolute',right:0,left:0,alignItems: "center",justifyContent: "center"}}>
         <Animated.FlatList
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
         </Animated.FlatList>
         <View style = {{flexDirection:'row',marginTop:10}}>
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
      </View>         
      </View> */}
      <View style = {{position:'absolute',right:0,marginRight:5}}>
      <TouchableOpacity
      activeOpacity={1}>
       <ThreeDotIcon width = {32} height = {32}/> 
      </TouchableOpacity>
      </View>  
      </View>
    <View style = {{justifyContent:'center',alignItems:'center',marginTop:30}}>
    {/* <LottieView
      source={weatherAnimations[navigatePages[currentPage].rain]}
      autoPlay
      loop
      style={{width: 150,height: 150}}/> */}
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
      {/* <Text style= {{textAlign:'center',fontFamily:fontFamilies.INTER.regular,fontSize:16,color:'#FFFFFF',marginTop:5,includeFontPadding:false}}>
       {navigatePages[currentPage].rain} 
      </Text> */}
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
       {""} 
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
      onPress={()=>navigation.navigate("SevenDays",{lat:latitude,lon:longitude})}>
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

const LocationWeatherStyle = StyleSheet.create({
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

export default SpecificLocationWeather;