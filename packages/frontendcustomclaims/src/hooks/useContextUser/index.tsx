import { useContext } from "react";
import { UserContextProps, UsuarioContext } from "../../context";

export const useContextUser = (): UserContextProps => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
