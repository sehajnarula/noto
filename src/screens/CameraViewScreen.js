import React, { useEffect } from "react";
import {View,SafeAreaView,ScrollView,TouchableOpacity,Text,StyleSheet} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {launchCamera} from "react-native-image-picker";
import ml from "@react-native-firebase/ml";

const CameraViewScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: "photo",
      cameraType: "back",
      saveToPhotos: true,
    };
    try {
      const response = await launchCamera(options);
      console.log("captured file", response);
      if (response.didCancel || !response.assets) {
        navigation.goBack(); // User canceled
      } else {
        const photo = response.assets[0];
        const filePath = photo.uri.replace("file://","");
        const processedImage = await ml().textRecognizerProcessImage(filePath);
        processedImage.blocks.forEach((block) => {
        console.log("Block text:", block.text);
      });
        console.log("Captured photo:", photo.uri);
        }
    } catch (error) {
      console.log("Camera launch error", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleCameraLaunch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:"center",alignItems: "center"}}>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CameraViewScreen;