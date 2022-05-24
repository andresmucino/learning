/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from "firebase";
import React from "react";
import { auth } from "../../firebase";

export type UserContextProps = {
  usuario: any;
  iniciarSesion: () => Promise<void>;
  cerrarSesion: () => void;
};

export const UsuarioContext = React.createContext<UserContextProps>(null!);

interface Props {
  children: JSX.Element;
}

export const UsuarioProvider: React.FC<Props> = ({ children }) => {
  const dataUsuarioInitial = {
    email: null,
    uid: null,
    activo: null,
  };

  const [usuario, setUsuario] = React.useState<any>(dataUsuarioInitial);

  const detectarUsuario = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            console.log("es administrador");
            setUsuario({
              email: user.email,
              uid: user.uid,
              activo: true,
              rol: "admin",
            });
          } else if (!!idTokenResult.claims.autor) {
            console.log("es autor");
            setUsuario({
              email: user.email,
              uid: user.uid,
              activo: true,
              rol: "autor",
            });
          } else {
            console.log("es invitado");
            setUsuario({
              email: user.email,
              uid: user.uid,
              activo: true,
              rol: "invitado",
            });
          }
        });
      } else {
        console.log(user)
        setUsuario({
          email: null,
          uid: null,
          activo: false,
          rol: null,
        });
      }
    });
  };

  React.useEffect(() => {
    detectarUsuario();
  }, []);

  const iniciarSesion = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider);

      //@ts-ignore
      const existe = await db.collection("usuarios").doc(res.user?.email).get();

      if (!existe.exists) {
        //@ts-ignore
        await db.collection("usuarios").doc(res.user?.email).set({
          uid: res.user?.uid,
          email: res.user?.email,
          rol: "invitado",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    auth.signOut();
  };

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
};
