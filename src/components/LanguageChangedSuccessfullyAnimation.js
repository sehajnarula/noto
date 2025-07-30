import React,{useState,useEffect,useContext,useRef} from "react";
import {View,Text,StyleSheet,Platform,Animated,Image} from "react-native";
import StoreInternalData from "../context/StoreInternalData";
import {TranslateApi} from "../apicall/TranslateApi";
import {fontFamilies} from "../constants/fonts";
import LottieView from "lottie-react-native";

const LanguageChangedSuccessfullyAnimation = (props) => {
  const {getUserLanguageInStorage} = useContext(StoreInternalData);
  const [languageName, setLanguageName] = useState("");
  const [languageChangeMessage, setLanguageChangeMessage] = useState("");
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [textAnimation, setTextAnimation] = useState(false);
  const [showLanguageName, setShowLanguageName] = useState(false);

  const languageNameFadeAnim = useRef(new Animated.Value(0)).current;
  const messageFadeAnim = useRef(new Animated.Value(0)).current;

  const sendLanguages = [
    {
      displayLanguageName: "English",
      languageCode: "en",
    },
    {
      displayLanguageName: "हिंदी",
      languageCode: "hi",
    },
    {
      displayLanguageName: "ਪੰਜਾਬੀ",
      languageCode: "pa",
    },
  ];

  const getLanguage = async () => {
    const setLanguageFromStorage = await getUserLanguageInStorage();
    if (setLanguageFromStorage !== "") {
      const savedLanguageInArray = sendLanguages.find(
        (languages) => languages.languageCode === setLanguageFromStorage
      );
      setLanguageName(savedLanguageInArray?.displayLanguageName || "");
      const englishMessage = `Language Changed Successfully`;
      if (setLanguageFromStorage !== "en") {
        try {
          const [translated] = await Promise.all([
            TranslateApi(englishMessage, "en", setLanguageFromStorage),
          ]);
          setLanguageChangeMessage(translated);
        } catch (error) {
          console.log("languageerrorinsuccessanimation", error);
        }
      } else {
        setLanguageChangeMessage(englishMessage);
      }
    } else {
      console.log("languageemptyerrorincompletion");
    }
  };

  useEffect(() => {
    getLanguage();
    let fallbackTimer;
    if (Platform.OS === "android") {
      fallbackTimer = setTimeout(() => {
        if (!textAnimation) {
          triggerAnimations();
          if (props.onCompletion) {
            props.onCompletion();
          }
        }
      }, 5000);
    }
    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  const triggerAnimations = () => {
    setShowLanguageName(true);

    Animated.timing(languageNameFadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setTextAnimation(true);
      Animated.timing(messageFadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  const onLottieFinish = () => {
    triggerAnimations();
    if (props.onCompletion) {
      setTimeout(() => {
        props.onCompletion();
      }, 5000);
    }
  };

  return (
    <View style={languageChangeAnimationStyle.languageChangeOverlayBg}>
      <View style={languageChangeAnimationStyle.lottieanimationbg}>
        {isLowEnd ? (
          <Image
            source={require("../../assets/images/languagechangetickpur.gif")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        ) : (
          <LottieView
            source={require("../../assets/animations/languagesaveticknewbg.json")}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200 }}
            onAnimationFinish={onLottieFinish}
          />
        )}
      </View>

      {showLanguageName && languageName !== "" && (
        <Animated.Text
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            fontFamily: fontFamilies.INTER.bold,
            alignSelf: "center",
            fontSize: 22,
            opacity: languageNameFadeAnim,
          }}
        >
          {languageName}
        </Animated.Text>
      )}

      {textAnimation && languageChangeMessage !== "" && (
        <Animated.Text
          style={{
            textAlign: "center",
            marginTop: 7,
            color: "#FFFFFF",
            fontFamily: fontFamilies.INTER.regular,
            alignSelf: "center",
            fontSize: 18,
            opacity: messageFadeAnim,
          }}
        >
          {languageChangeMessage}
        </Animated.Text>
      )}
    </View>
  );
};

const languageChangeAnimationStyle = StyleSheet.create({
  languageChangeOverlayBg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  lottieanimationbg: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default LanguageChangedSuccessfullyAnimation;