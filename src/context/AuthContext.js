import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, firestore } from '../../firebaseconfig';
import {doc,setDoc} from 'firebase/firestore';
import {collection,getDocs} from "firebase/firestore";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: async () => {},
  googleSignInButtonPress: async () => {},
});

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [savedUsers,setSavedUsers] = useState([]);

  useEffect(() => {
    // Configure Google Sign-In once when component mounts

    GoogleSignin.configure({
      //webClientId:"AIzaSyCFcJ6Vcre-hWiC97t3dfCzHQiZ5v-u_dg",
      //webClientId:"1027840960807-7g2p74tg903vf71e7utgdlefndr8eges.apps.googleusercontent.com",
      webClientId:"1027840960807-7g2p74tg903vf71e7utgdlefndr8eges.apps.googleusercontent.com",
      offlineAccess:true,

    });  

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

//   const googleSignInButtonPress = async () => {
//   try {  
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     const { idToken, email, name } = await GoogleSignin.signIn();
//     if (!idToken || !email) {
//       throw new Error("No ID token or email found during Google Sign-In");
//     }
//     // Check if email already exists in users collection
//     const userSnapshot = await getDocs(collection(firestore, "users"));
//     const usersArray = userSnapshot.docs.map(doc => doc.data());
//     const userExists = usersArray.some(user => user.email === email);
//     if (userExists) {
//       console.log("User already exists, redirect to password screen");
//       return;
//     }
//     const googleCredential = GoogleAuthProvider.credential(idToken);
//     const userCredential = await signInWithCredential(auth, googleCredential);
//     const user = userCredential.user;
//     setUser(user);

//     await setDoc(doc(firestore, "users", user.uid), {
//       uid: user.uid,
//       displayName: user.displayName || name || "",
//       email: user.email || email,
//     });
//   } catch (error) {
//     console.log("Google Sign-In Error:", JSON.stringify(error));
//   }
// };

const googleSignInButtonPress = async () => {
  try {
    
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const userGet = await GoogleSignin.signIn();

    const googleCredential = GoogleAuthProvider.credential(userGet);

    const userCredential = await signInWithCredential(auth, googleCredential);

    const userGmail = userCredential.user;

    const userSnapshot = await getDocs(collection(firestore, "users"));
    const usersArray = userSnapshot.docs.map(doc => doc.data());
    const userExists = usersArray.some(getuser => getuser.email === userGmail.email);

    if (!userExists) {
      await setDoc(doc(firestore, "users", userGmail.uid), {
        uid: userGmail.uid,
        displayName: userGmail.displayName || "",
        email: userGmail.email,
      });
    }

    setUser(userGmail);

  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("signincancelled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("inprogress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play Services Not available");
    } else {
      console.log("Other Error", JSON.stringify(error));
    }
  }
};


  return (
    <AuthContext.Provider value={{ user, setUser, logout, googleSignInButtonPress }}>
      {children}
    </AuthContext.Provider>
  );
};
