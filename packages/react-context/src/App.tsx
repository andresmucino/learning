import { Chat, Navbar } from "./components";
import { useContextChat } from "./context";

export const App = () => {
  const { user } = useContextChat();
  return user !== null ? (
      <div>
        <Navbar />
        {user.estado ? (
          <Chat />
        ) : (
          <div className="lead text-center mt-5">Debes iniciar sesión</div>
        )}
      </div>

  ) : (
    <div>Cargando...</div>
  );
};
