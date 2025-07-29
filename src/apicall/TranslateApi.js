import axios from 'axios';

export const TranslateApi = async(textToTranslate,selectedLanguage,translationLanguage)=>{              //LibreTranslateApi
// try {
//   const response = await axios.post("https://libretranslate.com/translate",{
//     q: textToTranslate,
//     source:selectedLanguage,
//     target:translationLanguage,
//     format:'text', 
//   },{
//     timeout: 10000, // response wait time
//     headers: {
//      "Content-Type": "application/json",        //axios telling server that JSON request being sent 
//     },
//   });
//   return response.data.translatedText;
// }catch (error) {
//     console.log("translateapicallerror",error);
// }

try {
  const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: selectedLanguage,
        tl: translationLanguage,
        dt: "t",
        q: textToTranslate,
      },
      timeout: 10000,
    });
  return response.data[0][0][0];
}catch (error) {
    console.log("translateapicallerror",error);
}

};