import {FirebaseApp,initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithCredential} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {GoogleSignin, type SignInResponse} from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: "AIzaSyD-tqqO7ZQWnrFBYT9I__cy5Px7WwgVXaY",
  authDomain: "noto-56a36.web.app",
  projectId: "noto-56a36",
  storageBucket: "noto-56a36.firebasestorage.app",
  messagingSenderId: "835626221376",
  appId: "1:835626221376:android:04a1389976b942ff68c4a5"
};

const app:FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
//export const googleProvider = new GoogleAuthProvider();

// GoogleSignin.configure({
//   webClientId:"1027840960807-7g2p74tg903vf71e7utgdlefndr8eges.apps.googleusercontent.com",
//   offlineAccess:true
// });

// export const signInWithGoogle = async () => {
//   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // check play services integration
//   const signInResult: SignInResponse = await GoogleSignin.signIn();   // fetching user and returning user data
//   const {idToken} = await GoogleSignin.getTokens();   //fetching token(JWT)
//   if (!idToken) {
//     throw new Error('No ID token found');
//   }
//   const googleCredential = GoogleAuthProvider.credential(idToken);    //coversion to firebase credential
//   try {
//     debugger
//     return await signInWithCredential(getAuth(), googleCredential);
//   } catch (error) {
//     console.log("googleusererror",error);
//   }
// };

// export const signInWithGoogle = async () => {
//   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // check play services integration
//   const idToken = (await GoogleSignin.signIn()).data?.idToken;
//     if (!idToken) {
//     throw new Error('No ID token found');
//   }
//   const googleCredential = GoogleAuthProvider.credential(idToken);
//   try {
//     debugger
//     return await signInWithCredential(getAuth(), googleCredential);
//   } catch (error) {
//     console.log("googleusererror",error);
//   }
// };

export default app;
