import { useContext } from "react";
import { ChatContext, ChatContextPropsType } from "./chatProvider";

export const useContextChat = (): ChatContextPropsType => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "error al acceder al context"
    );
  }

  return context;
};
