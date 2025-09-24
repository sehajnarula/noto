import React,{useState,useEffect,useRef} from "react";
import {View,StyleSheet,SafeAreaView,TextInput,Text,TouchableOpacity} from "react-native";
import {fontFamilies} from "../constants/fonts";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";
import {ForgetPasswordResetMailApi} from "../apicall/ForgetPasswordResetMailApi";

const ForgetPasswordCodeEnterScreen = ({route})=>{

    const{userEmailTyped,verificationCode,sendUserName} = route.params;
    const [verificationCodeLocal,setVerificationCodeLocal] = useState("");
    const[enterCodeHeader,setEnterCodeHeader] = useState("Otp Verification");
    const[enterCodeMessage,setEnterCodeMessage] = useState("Enter The Code You Received On Your Email");
    const[verifyCodeTp,setVerifyCodeTP] = useState("Verify Code");
    const[resendOtpMessage,setResendOtpMessage] = useState("Resend");
    const[resendOtpTimer,setResendOtpTimer] = useState(``);
    const[otpDigitOne,setOtpDigitOne] = useState("");
    const[otpDigitTwo,setOtpDigitTwo] = useState("");
    const[otpDigitThree,setOtpDigitThree] = useState("");
    const[otpDigitFour,setOtpDigitFour] = useState("");
    const [timer,setTimer] = useState(30);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const inputone = useRef();
    const inputtwo = useRef();
    const [enableResend,setEnableResend] = useState(false);
    const inputthree = useRef();
    const inputfour = useRef();

    useEffect(()=>{
    setVerificationCodeLocal(verificationCode);
    },[]);

    useEffect(() => {
        let otpCountdown = null;
        if (timer > 0) {
        otpCountdown = setInterval(() => {
        setTimer(prev => {
        const newTime = prev - 1;
        setResendOtpTimer(`Resend OTP in ${newTime}s`);
        return newTime;
        });
         }, 1000);
        } else {
            setEnableResend(true);
            setResendOtpTimer(""); // clear message
        }
        return () => clearInterval(otpCountdown);
        }, [timer]);


    const resendApi = ()=>{
     setEnableResend(false);
     setTimer(30);
     const min = 1000;
     const max = 9999;
     const otpNumber = Math.floor(Math.random() * (max - min + 1)) + min;
     setVerificationCodeLocal(otpNumber.toString());
     ForgetPasswordResetMailApi("sehajbir54@gmail.com",userEmailTyped,"TeamNoto",sendUserName,"Otp For Changing Password",`Hello ${sendUserName}, ${otpNumber} is your code to access the password changing process`);
    };

    return(

       <SafeAreaView style = {{flex:1}}>
        <View style = {{flex:1}}>
        <View style = {ForgetPasswordCodeStyle.textCenteredView}>
         <Text style = {ForgetPasswordCodeStyle.OtpHeaderText}>
         {enterCodeHeader}
         </Text>
         <View style = {{marginTop:20}}>
         <Text>
         {enterCodeMessage}
         </Text>
         <View style = {ForgetPasswordCodeStyle.otpTextInputView}>
         <TextInput
         style = {ForgetPasswordCodeStyle.otpTextInputStyle}
         ref={inputone}
         maxLength={1}
         onChangeText={digit=>{
            setOtpDigitOne(digit);
            if(digit.length>=1){
                inputtwo.current.focus();
            }
         }}
         value={otpDigitOne}
         autoCapitalize="none"
         keyboardType='number-pad'
         autoCorrect={false}
         />   
         <TextInput 
         style = {ForgetPasswordCodeStyle.otpTextInputStyle}
         autoCapitalize="none"
         ref={inputtwo}
            onChangeText={digit=>{
            setOtpDigitTwo(digit);
            if(digit.length>=1){
                inputthree.current.focus();
            }
         }}
         value={otpDigitTwo}
         maxLength={1}
         keyboardType='number-pad'
         autoCorrect={false}/>   
         <TextInput style = {ForgetPasswordCodeStyle.otpTextInputStyle}
         autoCapitalize="none"
         ref={inputthree}
         maxLength={1}
         onChangeText={digit=>{
            setOtpDigitThree(digit);
            if(digit.length>=1){
                inputfour.current.focus();
            }
         }}
         value={otpDigitThree}
         keyboardType='number-pad'
         autoCorrect={false}/>   
         <TextInput
         maxLength={1} 
         style = {ForgetPasswordCodeStyle.otpTextInputStyle}
         autoCapitalize="none"
         onChangeText={digit=>setOtpDigitFour(digit)}
         ref={inputfour}
         value={otpDigitFour}
         keyboardType='number-pad'
         autoCorrect={false}/>   
         </View>
         <View style = {{marginTop:20}}>
         {enableResend?(
           <Text style = {ForgetPasswordCodeStyle.resendText}
           onPress={()=>{
            resendApi();
           }}>
           {resendOtpMessage} 
           </Text> 
         ):(
           <Text style = {ForgetPasswordCodeStyle.resendTextTimer}>
            {resendOtpTimer}
           </Text> 
         )}
         </View>
        </View>                       
        </View>
        </View>
        <View style = {{flexDirection:'column',marginBottom:insets.bottom+10}}>
         <TouchableOpacity
         activeOpacity={0.9}
         onPress={()=>{
            const completeOtp = `${otpDigitOne}${otpDigitTwo}${otpDigitThree}${otpDigitFour}`;
            if(completeOtp!==verificationCodeLocal){
            Toast.show({
                    type:'error',
                    text1: 'Enter Correct Otp.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                });
            }else if(!otpDigitOne || !otpDigitTwo || !otpDigitThree || !otpDigitFour){
                Toast.show({
                    type:'error',
                    text1: 'Otp must be of four digits.',
                    autoHide: true,
                    position:'bottom',
                    visibilityTime: 3000,
                });
            }else{
                navigation.navigate("CreateNewPasswordScreen",{sendEmailToChangePassword:userEmailTyped});
            }
        }}
         style = {ForgetPasswordCodeStyle.verifyCodeTouchableOpacity}>
         <View style = {ForgetPasswordCodeStyle.touchableVerifyView}>
         <Text style = {ForgetPasswordCodeStyle.verifyCodeText}>
         {verifyCodeTp}
         </Text>
         </View>   
        </TouchableOpacity>   
        </View>
       </SafeAreaView> 

    );

};

const ForgetPasswordCodeStyle = StyleSheet.create({

    OtpHeaderText:{
      fontSize:32,
      color:'#180E25',
      fontFamily:fontFamilies.INTER.bold,
      textAlign:'center',
      alignContent:'center'
    },

    otpTextInputView:{
        width:"100%",
        flexDirection:'row',
        marginTop:20
    },

    otpMessageTextStyle:{
        color:'#827D89',
        fontFamily:fontFamilies.INTER.regular,
        fontSize:16,
        textAlign:'center',
        alignContent:'center',               
    },

    otpTextInputStyle:{
        width:40,
        height:40,
        marginStart:23,
        padding:5,
        textAlign:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        color:'#180E25',
        borderColor:"#6A3EA1"
    },

    textCenteredView:{
        alignItems:'center',
        justifyContent:'center',
        top:150
    },

    verifyCodeTouchableOpacity:{
        backgroundColor:'#6A3EA1',
        padding:14,
        marginTop:20,
        borderRadius:30,
        justifyContent:'center',
        marginHorizontal:15,
    },

    resendText:{
        fontSize:16,
        fontFamily:fontFamilies.INTER.medium,
        color:'#6A3EA1',
        textAlign:'center',
        alignItems:'center'
    },

    resendTextTimer:{
        fontSize:16,
        fontFamily:fontFamilies.INTER.medium,
        color:'#180E25',
        textAlign:'center',
        alignItems:'center'
    },

    touchableVerifyView:{
        flexDirection:'row',
        position:'relative',
        justifyContent:'center'},
    
    verifyCodeText:{
        textAlign:'center',
        fontSize:16,
        color:'#FFFFFF',
        fontFamily:fontFamilies.INTER.medium}

}
);

export default ForgetPasswordCodeEnterScreen;