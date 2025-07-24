import React,{useState,useEffect} from "react";
import { View,StyleSheet,SafeAreaView,Text,Dimensions,TouchableOpacity} from "react-native";
import Animated, {useAnimatedRef,useAnimatedScrollHandler,useSharedValue,runOnJS} from "react-native-reanimated";
import OnBoardingImagePageOne from "../../assets/images/onboardingscreenimageone.svg";
import { fontFamilies } from "../constants/fonts";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import PurpleArrow from "../../assets/images/letsgetstartedarrow.svg";

const { width } = Dimensions.get("window");

const OnBoardingNew = () =>{

  const navigatePages = [
    {
      text: "Note Down anything you want to achieve, today or in the future"
      //image: <OnBoardingImagePageOne width={261} height={238} />,
    },
    {
      text: "Creates notes for any desired category"
      //image: <OnBoardingImagePageOne width={261} height={238} />,
    },
    {
      text: "Start Planning"
      //image: <OnBoardingImagePageOne width={261} height={238} />,
    },
  ];

    const flatListReference = useAnimatedRef(null);
    const scrollX = useSharedValue(0);
    const navigation = useNavigation();
    const [currentPage,setPage] = useState(0);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x;
        const index = Math.round(event.contentOffset.x / width);
        runOnJS(setPage)(index);
      },
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const nextIndex = (currentPage + 1) % navigatePages.length;
        flatListReference.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, 3000);
  
      return () => clearInterval(interval);
    }, [currentPage]);

   return(

    <SafeAreaView style = {{flex:1,backgroundColor:'#6A3EA1'}}>

      <View style = {{flex:1}}>
      
        <View style = {{top:120,justifyContent:'center',alignItems:'center',position:'absolute'}}>

         <OnBoardingImagePageOne width = {261} height = {238}>
         </OnBoardingImagePageOne>

         <Animated.FlatList
         style = {{marginTop:10}}
         data={navigatePages}
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item) => item.text}
         onScroll={scrollHandler}
         ref={flatListReference}
         renderItem={({item}) =>(
            <View style = {{width,padding:10}}>
             <Text style = {onBoardingScreenStyle.PagerText}>{item.text}</Text>   
            </View>
         )}>
         
         </Animated.FlatList>

         <View style = {{flexDirection:'row',marginTop:10}}>

        {navigatePages.map((item) => (
                <View
                key={item.text}
                style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                marginHorizontal: 5,
                backgroundColor: currentPage === navigatePages.findIndex(p => p.text === item.text)
                 ? "#DEDC52"
                 : "#FFFFFF",
               }}
               />
            ))}

         </View>   

        </View>

        <View style = {{flex:1,flexDirection:'column',marginBottom:20,justifyContent:'flex-end'}}>
        
        <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=> navigation.navigate("LoginScreen")}
        style = {{backgroundColor:'#FFFFFF',padding:14,borderRadius:30,justifyContent:'center',marginHorizontal:15}}>
        
        <View style = {{flexDirection:"row",justifyContent:'center',position:'relative'}}>
        <Text
        style = {{color:'#6A3EA1',fontSize:16,textAlign:'center',fontFamily:fontFamilies.INTER.medium}}>
        {"Let's Get Started"}    
        </Text>
        <PurpleArrow width = {22} height = {22} position = {'absolute'} right = {0} marginEnd = {15}>
        </PurpleArrow>
        </View>
        </TouchableOpacity>     
        
        </View>    

        </View>

    </SafeAreaView>

   ); 

};

const onBoardingScreenStyle = StyleSheet.create({

    PagerText: {
    fontFamily: fontFamilies.INTER.bold,
    fontSize: 20,
    textAlign:'center',
    color: "#FFFFFF",
  },

});

export default OnBoardingNew;