import React,{useState,useEffect,useContext} from "react";
import {View,StyleSheet,FlatList,TouchableOpacity} from "react-native";
import CloseNoteLayoutDialog from '../../assets/images/closeiconcardbox.svg';
import LanguageListLayout from "./LanguageListLayout";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native";
import StoreInternalData from "../context/StoreInternalData";

const SelectLanguageBottomSheet = props=>{

    const insets = useSafeAreaInsets();
    const {setUserLanguageInStorage,getUserLanguageInStorage}=useContext(StoreInternalData);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const isFocused = useIsFocused();

    useEffect(()=>{
    (async () => {
      const getStorageLangCode = await getUserLanguageInStorage();
      setSelectedLanguage(getStorageLangCode);
    })();
    },[]);

    const onSelectingLanguage = async(languageCode,languageName)=>{
    await setUserLanguageInStorage(languageCode);
    setSelectedLanguage(languageCode);
    props.updateLanguageLocally(languageName);
    };

    return(

       <View style = {languageBottomSheetView.bottomSheetBg}>
        <View style = {{
        backgroundColor:'#FFFFFF',
        width:"100%",
        height:250,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        elevation:5,
        shadowColor:'#000',
        shadowOffset: {width:0,height:2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        paddingBottom:insets.bottom+10
        }}>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>props.closeModal()}>
        <View style = {{flexDirection:'row',marginTop:15,alignItems:'flex-end',justifyContent:'flex-end',marginEnd:15}}>
        <CloseNoteLayoutDialog width = {24} height = {24}></CloseNoteLayoutDialog>
        </View>            
        </TouchableOpacity>
        <FlatList
        style = {{marginTop:10,marginHorizontal:5}}
        horizontal = {props.isHorizontal}
        showsHorizontalScrollIndicator = {false}
        data={props.sendLanguagesInLayout}
        showsVerticalScrollIndicator = {false}
        keyExtractor={languages=>languages.displayLanguageName}
        renderItem={({item})=>(
        <LanguageListLayout
         sendLanguageData={item}
         gotSelectedLanguage={selectedLanguage}
         onToggleChange = {onSelectingLanguage}> 
        </LanguageListLayout>    
        )}>
        </FlatList>
        </View>
       </View> 

    );

};

const languageBottomSheetView = StyleSheet.create({
    bottomSheetBg:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        right:0,
        bottom:0,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'flex-end',
    }
});

export default SelectLanguageBottomSheet;