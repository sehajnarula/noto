import { View,StyleSheet,Image } from "react-native";

const HomeHorizontalTitlesFlatListLayout = props =>{
    return(
      <View style = {{marginLeft:6,width:103,height:161,alignItems:'center'}}>
      <Image source = {{uri:props.sendData.poster}} style = {{width:103,height:161,borderRadius:6}}/>
      </View>  
    );
};

export default HomeHorizontalTitlesFlatListLayout;