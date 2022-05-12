import { signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db, provider } from "../firebase";

export type ChatContextPropsType = {
  user: any;
  message: any;
  ingresarUsuario: () => void;
  cerrarSesion: () => void;
  agregarMesnajes: (uidChat: string, textoInput: string) => void;
};

export const ChatContext = createContext<ChatContextPropsType>(null!);

interface ChatProviderProps {
  children: JSX.Element;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const userData = { uid: null, email: null, estado: null };
  const [user, setUser] = useState<any>(userData);
  const [message, setMessage] = useState<any>([]);

  useEffect(() => {
    const detectedUser = () => {
      auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          setUser({ uid: user?.uid, email: user?.email, estado: true });
          cargarMensajes();
        } else {
          setUser({ uid: null, email: null, estado: false });
        }
      });
    };
    detectedUser();
  }, []);

  const cargarMensajes = async () => {
    const querysnapshot = await getDocs(collection(db, "chat"));

    const query = querysnapshot.docs.map((item) => item.data());
    setMessage(query)
  };

  const ingresarUsuario = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    signOut(auth);
  };

  const agregarMesnajes = async (uidChat: string, textoInput: string) => {
    try {
      await addDoc(collection(db, "chat"), {
        fecha: Date.now(),
        texto: textoInput,
        uid: uidChat,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{ agregarMesnajes, cerrarSesion, ingresarUsuario, user, message }}
    >
      {children}
    </ChatContext.Provider>
  );
};
