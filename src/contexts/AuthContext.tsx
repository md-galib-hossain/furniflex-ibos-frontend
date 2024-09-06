import auth from "@/services/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>(null);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const signUpUserWithEmailPass = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUserWithEmailPass = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const loginWithApple = () => {
    setLoading(true);
    return signInWithPopup(auth, appleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("current user", currentUser);
      console.log("observing current user inside useeffect of auth provider");
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    signUpUserWithEmailPass,
    signInUserWithEmailPass,
    logOutUser,
    loading,
    loginWithGoogle,
    loginWithApple,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
