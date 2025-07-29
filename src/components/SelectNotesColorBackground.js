import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import SelectNotesColorBackgroundLayout from "./SelectNotesColorBackgroundLayout";
import {collection,doc,getDocs,updateDoc} from "firebase/firestore";
import {firestore} from "../../firebaseconfig";
import Toast from "react-native-toast-message";

const SelectNotesColorBackground = props => {
  
  const [selectedColor, setSelectedColor] = useState("");

  const fetchNoteBgColor = async (noteIdMethod) => {
    try {
      const noteSnapshot = await getDocs(collection(firestore, "notes"));
      const notesArray = noteSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const getNote = notesArray.find(note => note.id === noteIdMethod);
      if (getNote) {
        setSelectedColor(getNote.dbBackgroundColor); // set initially in flatlistlayout
      }
    } catch (error) {
      console.log("notedbfetcherror", error);
    }
  };

    const updateNoteBgColorInDb = async(updatenotemethodid,updatenotebgcolor)=>{
      try {
        const documentReference = doc(firestore,"notes",updatenotemethodid);
        await updateDoc(documentReference,updatenotebgcolor)
              .then(()=>{
            Toast.show({
                  type:'success',
                  text1: 'Note Background Updated Successfully.',
                  autoHide: true,
                  position:'bottom',
                  visibilityTime: 3000,
                  });
              }).catch((error)=>{
            Toast.show({
                  type:'error',
                  text1: 'Unable to update note background.',
                  autoHide: true,
                  position:'bottom',
                  visibilityTime: 3000,
                  });
              });
      } catch (error) {
        console.log("updatebgcolorerror",error);
      }
    };

  useEffect(() => {
    if (props.sendingNoteId) {
      fetchNoteBgColor(props.sendingNoteId);
    }
  }, [props.sendingNoteId]);

  const handleColorClick = (color) => {
    setSelectedColor(color.bgColorSaved);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        horizontal={props.isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.colorArray}
        keyExtractor={colors => colors.bgColorSaved}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>{
            handleColorClick(item);
            updateNoteBgColorInDb(props.sendingNoteId,{
            dbBackgroundColor:item.bgColorSaved
            });
            props.updateBgColorFromFl(item.bgColorSaved);
          }}>
            <SelectNotesColorBackgroundLayout
              sendNoteBgColor={item}
              isSelected={item.bgColorSaved === selectedColor}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectNotesColorBackground;