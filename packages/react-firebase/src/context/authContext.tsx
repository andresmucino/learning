import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../Firebase";

export type AuthContextProps = {
  singup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loginWithGoogle: () => void;
  resetPassword: (emial: string) => void;
  user: any;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps>(null!);

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const singup = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, passeord: string) => {
    return await signInWithEmailAndPassword(auth, email, passeord);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
