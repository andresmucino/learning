import React from "react";
import { useContextChat } from "../../context";

export const Formulario = () => {
  const { agregarMesnajes, user } = useContextChat();

  const [message, setMessage] = React.useState("");

  const agregar = (e: any) => {
    e.preventDefault();
    if (!message.trim()) {
      console.log("vacio");
      return;
    }
    agregarMesnajes(user.uid, message);
    setMessage("");
  };
  return (
    <form className="fixed-bottom input-group p-3 bg-dark" onSubmit={agregar}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="button-addon2"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};
