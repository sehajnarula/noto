import React,{useEffect,useContext} from "react";
import {View,SafeAreaView} from "react-native";
import {useNavigation,useIsFocused} from "@react-navigation/native";

const SplashScreen = ()=>{

    const navigation = useNavigation();
    

    return(

     <SafeAreaView style = {{flex:1}}>

        <View>

        </View>

     </SafeAreaView>   

    );

};

export default SplashScreen;