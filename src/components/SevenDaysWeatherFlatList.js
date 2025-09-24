import { View,StyleSheet,FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SevenDaysWeatherFlatListLayout from "./SevenDaysWeatherFlatListLayout";

const SevenDaysWeatherFlatList = props => {
    
    const insets = useSafeAreaInsets();
    
    return(

     <View style = {{marginHorizontal:15,marginBottom:insets.bottom+10}}>
     <FlatList
     horizontal = {props.isHorizontal}
     showsHorizontalScrollIndicator = {false}
     showsVerticalScrollIndicator = {false}
     data = {props.data}
     keyExtractor={(item, index) => index.toString()}
     renderItem={({item})=>(
       <SevenDaysWeatherFlatListLayout
       sendData = {item}/> 
     )}>

     </FlatList>
     </View>      

    );
};

export default SevenDaysWeatherFlatList;