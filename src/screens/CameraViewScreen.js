import React from "react";
import {View,SafeAreaView,TouchableOpacity,ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useIsFocused} from "@react-navigation/native";

const CameraViewScreen = ()=>{
    
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    return(

      <SafeAreaView style = {{flex:1}}>
        <ScrollView style = {{flexGrow:1}}>
        <View style = {{flex:1,padding:4}}>
        </View>
        </ScrollView>
      </SafeAreaView>

    );
    
};

export default CameraViewScreen;