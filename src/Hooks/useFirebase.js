import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import firebaseInitialization from "../firebase/firebase.init";

firebaseInitialization();

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const auth = getAuth();
  auth.useDeviceLanguage();

  // Initialize RecaptchaVerifier
  const initializeRecaptcha = (elementId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      elementId,
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  //Sign in with mobile number
  const signInWithPhone = (phoneNumber) => {
    setIsLoading(true);
    const appVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle Errors
        setIsLoading(false);
      });
  };

  // sign out
  const signOutUser = (router) => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return {
    user,
    signOutUser,
    isLoading,
    signInWithPhone,
    initializeRecaptcha,
  };
};

export default useFirebase;
