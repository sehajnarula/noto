import {BackHandler,Platform} from "react-native";

export function closeApp (){
    if(Platform.OS==="android"){
        BackHandler.exitApp();
    }else{
      console.log("OS Problem","App is open on an Android device.");  
    }
};