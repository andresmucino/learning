import React from "react";
import { LibrosContext, LibrosContextProps } from "../../context";

export const useContextLibros = (): LibrosContextProps => {
  const context = React.useContext(LibrosContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BooksProvider");
  }

  return context;
};
