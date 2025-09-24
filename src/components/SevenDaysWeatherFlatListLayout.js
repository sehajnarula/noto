import {View,Text,Image} from "react-native";
import {fontFamilies} from "../constants/fonts";

const SevenDaysWeatherFlatListLayout = props =>{

    const date = new Date(props.sendData.time.replace(" ", "T"));
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return(
     <View style = {{marginTop:10,marginLeft:20}}>
     <Text style = {{fontFamily:fontFamilies.INTER.medium,fontSize:16,color:'#FFFFFF'}}>
     {time}
     </Text>
     <Image source ={{uri: "https:" + props.sendData.condition.icon}}  width={24} height={24} marginLeft = {10}/>
     <Text style = {{fontFamily:fontFamilies.INTER.regular,fontSize:12,color:'#FFFFFF',marginTop:5,marginLeft:10}}>
     {props.sendData.temp_c}
     </Text>
     </View>   
    )

};

export default SevenDaysWeatherFlatListLayout;