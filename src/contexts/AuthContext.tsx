import auth from "@/services/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
const [loading,setLoading] = useState(true)
  const signUpUserWithEmailPass = (email: string, password: string) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUserWithEmailPass = (email: string, password: string) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
      console.log("current user",currentUser);
      console.log("observing current user inside useeffect of auth provider");
    });
    return ()=> {
      unSubscribe()
    }
  }, []);

  const authInfo = { user, signUpUserWithEmailPass, signInUserWithEmailPass,logOutUser,loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
