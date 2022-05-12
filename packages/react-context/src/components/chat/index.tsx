import { useEffect, useRef } from "react";
import { useContextChat } from "../../context";
import { Formulario } from "../formulario";

export const Chat = () => {
  const { message, user } = useContextChat();

  const refZoneChat = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {

    refZoneChat.current!.scrollTop = refZoneChat.current!.scrollHeight;
  }, [message]);

  return (
    <div
      className="mt-3 px-2"
      style={{ height: "75vh", overflow: "scroll" }}
      ref={refZoneChat}
    >
      {message.map((item: any, index: any) =>
        item.uid === user.uid ? (
          <div className="d-flex justify-content-end mb-2" key={index}>
            <span className="badge bg-primary">{item.texto}</span>
          </div>
        ) : (
          <div className="d-flex justify-content-start mb-2" key={index}>
            <span className="badge bg-secondary">{item.texto}</span>
          </div>
        )
      )}

      <Formulario />
    </div>
  );
};
