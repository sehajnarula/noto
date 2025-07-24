import {FirebaseApp,initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithCredential} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {GoogleSignin, type SignInResponse} from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: "AIzaSyCFcJ6Vcre-hWiC97t3dfCzHQiZ5v-u_dg",
  authDomain: "notonotesapp-5f8a6.firebaseapp.com",
  projectId: "notonotesapp-5f8a6",
  storageBucket: "notonotesapp-5f8a6.appspot.com",
  messagingSenderId: "1027840960807",
  appId: "1:1027840960807:android:4de693f06781b89cd2e102"
};

const app:FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

GoogleSignin.configure({
  webClientId:"1027840960807-7g2p74tg903vf71e7utgdlefndr8eges.apps.googleusercontent.com",
  offlineAccess:true
});

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // check play services integration
  const signInResult: SignInResponse = await GoogleSignin.signIn();   // fetching user and returning user data
  const {idToken} = await GoogleSignin.getTokens();   //fetching token(JWT)
  if (!idToken) {
    throw new Error('No ID token found');
  }
  const googleCredential = GoogleAuthProvider.credential(idToken);    //coversion to firebase credential
  try {
    debugger
    return await signInWithCredential(getAuth(), googleCredential);
  } catch (error) {
    console.log("googleusererror",error);
  }
};

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
