import {View,SafeAreaView,Text,ScrollView,TouchableOpacity,Dimensions} from "react-native";

const TitleDetails = ({route})=>{
    
    const {width} = Dimensions.get("window");
    const {video,story,cast,title,runtime,age,releaseYear,titleid} = route.params;
    
    return(

       <SafeAreaView style = {{flex:1}}>
        <View style = {{flex:1}}>
        <View style = {{width:width,height:221,position:'relative',borderRadius:6}}>
        </View>
        </View>
       </SafeAreaView> 

    )

};

export default TitleDetails;