import { View,TouchableOpacity,FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeHorizontalTitlesFlatListLayout from "./HomeHorizontalTitlesFlatListLayout";

const HomeHorizontalTitlesFlatList = props =>{
    
    const navigation = useNavigation();

    return(

        <View style = {{marginHorizontal:4,marginTop:5}}>
         <FlatList
         horizontal = {props.isHorizontal}
         showsHorizontalScrollIndicator = {false}
         showsVerticalScrollIndicator = {false}
         data = {props.data}
         keyExtractor={movies=>movies.id}
         renderItem={({item})=>(
           <TouchableOpacity
           activeOpacity={0.9}
           onPress={()=>{
            navigation.navigate("TitleDetails",{video:item.trailer,story:item.synopsis,cast:item.cast,title:item.title,runtime:item.runtime,age:item.ageRating,releaseYear:item.year,titleid:item.id});
           }}>
           <HomeHorizontalTitlesFlatListLayout
           sendData = {item}/> 
           </TouchableOpacity> 
         )}>
         </FlatList>   
        </View>

    );
};

export default HomeHorizontalTitlesFlatList;