import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export type LibrosContextProps = {
  libros: Array<any>;
  fetchLibros: any;
};

export const LibrosContext = React.createContext<LibrosContextProps>(null!);

interface LibrosProviderProps {
  children: JSX.Element;
}
export const LibrosProvider: React.FC<LibrosProviderProps> = ({ children }) => {
  const [libros, setLibros] = useState<any>([]);

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const res = await db.collection("libros").get();

      const arrayLibros = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setLibros(arrayLibros);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LibrosContext.Provider value={{ fetchLibros, libros }}>
      {children}
    </LibrosContext.Provider>
  );
};
