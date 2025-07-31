import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
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
        const filePath = photo.uri.replace("file://", "");
        const processedImage = await ml().textRecognizerProcessImage(filePath);
        processedImage.blocks.forEach((block) => {
        console.log("Block text:", block.text);
      });
        // Navigate or handle photo
        console.log("Captured photo:", photo.uri);
        // navigation.navigate("NextScreen", { image: photo });
      }
    } catch (error) {
      console.log("Camera launch error", error);
    }
  };

  const handlePickFromGallery = async () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 1,
    };
    try {
      const response = await launchImageLibrary(options);
      console.log("gallery pick", response);

      if (response.didCancel || !response.assets) return;

      const photo = response.assets[0];
      // Handle selected photo
      console.log("Selected photo:", photo.uri);
      // navigation.navigate("NextScreen", { image: photo });
    } catch (error) {
      console.log("Gallery pick error", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleCameraLaunch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CameraViewScreen;