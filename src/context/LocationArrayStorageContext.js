import React,{useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationArrayStorageContext = React.createContext();

export const LocationArrayProvider = ({children})=>{

    const [userLocations,setUserLocations] = useState([]);

    const addLocationInArray = async(id,cityName,latitude,longitude)=>{
        try {
          const saveLocations = ([...userLocations,id,cityName,latitude,longitude]);
          setUserLocations(saveLocations);
          await AsyncStorage.setItem("usersavedlocations",saveLocations);
        } catch (error) {
          console.log("addlocationinstorageerror",error);  
        }
    };


    const deleteLocationInArray = async(id)=>{
        try {
            const savedLocations = await AsyncStorage.getItem("usersavedlocations");
            const getSavedLocations = savedLocations ? JSON.parse(savedLocations) : [];
            const updateLocationsArray = getSavedLocations.filter(locations=>locations.id !== id)
            await AsyncStorage.setItem("usersavedlocations",updateLocationsArray);
        } catch (error) {
          console.log("deletelocationinstorageerror",error);    
        }
    };

    return(
      <LocationArrayStorageContext.Provider value={{data:userLocations,addLocationInArray,deleteLocationInArray}}>
        {children}
      </LocationArrayStorageContext.Provider>
    );

};

export default LocationArrayStorageContext;