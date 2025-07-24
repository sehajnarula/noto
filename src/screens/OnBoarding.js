import React,{useEffect, useState} from "react";
import {View,StyleSheet,SafeAreaView,Text,Dimensions,TouchableOpacity} from "react-native";
import Animated, {useAnimatedRef,useAnimatedScrollHandler,useSharedValue,runOnJS} from "react-native-reanimated";
import OnBoardingImagePageOne from "../../assets/images/onboardingscreenimageone.svg";
import { fontFamilies } from "../constants/fonts";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import PurpleArrow from "../../assets/images/letsgetstartedarrow.svg";

const { width } = Dimensions.get("window");

const OnBoarding = () => {

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
  const letsgetstartedButton = "Let's Get Started";
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

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "blue"}}>
      <View style={{}}>

      <View style = {{justifyContent:'center',position:'absolute',top:120}}>

        <View style = {{justifyContent:'center',alignItems:'center'}}>
        <OnBoardingImagePageOne
        width={261} height={238} alignItems = {'center'}>
        </OnBoardingImagePageOne>
       </View> 

          <Animated.FlatList
          style = {{marginTop:10}}
          ref={flatListReference}
          data={navigatePages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.text}
          onScroll={scrollHandler}
          renderItem={({ item }) => (
            <View style={{ width,padding: 20 }}>
              {/* {item.image} */}
              <Text style={onBoardingStyleSheet.PagerText}>{item.text}</Text>
            </View>
          )}
        />

    <View style = {{justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:"red"}}>

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

        

      </View>
      <View style={{ flexDirection: "column", marginBottom: 15,justifyContent:'flex-end' }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={onBoardingStyleSheet.letsgetstartedTouchableOpacity}
          >
            <View style={onBoardingStyleSheet.touchableOpacityViewStyle}>
              <Text
                style={{
                  color: "#6A3EA1",
                  textAlign: "center",
                  fontSize: 16,
                  //fontFamily: fontFamilies.INTER.medium,
                }}
              >
                {letsgetstartedButton}
              </Text>
              <PurpleArrow
                style={{position:"absolute", right:0, marginTop:4}}
              />
            </View>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  
    );
};

const onBoardingStyleSheet = StyleSheet.create({
  
  PagerText: {
    //fontFamily: fontFamilies.INTER.bold,
    fontSize: 20,
    textAlign:'center',
    color: "#FFFFFF",
  },

  touchableOpacityViewStyle: {
    flexDirection: "row",
    justifyContent: "center",

  },

  letsgetstartedTouchableOpacity: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 30,
    // justifyContent: "center
    marginHorizontal: 15,
    // justifyContent:'flex-end'

  },

});

export default OnBoarding;
