import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context";

export const useContextAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContextAuth must be used within a AuthProvider");
  }

  return context;
};
