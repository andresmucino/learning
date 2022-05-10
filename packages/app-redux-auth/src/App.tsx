import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login, Navbar, Perfil, Pokemones } from "./components";
import { auth } from "./firebase";

export const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState<any>(false);

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      });
    };

    fetchUser();
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            element={
              // <RutaProtegida>
                <Pokemones />
              // </RutaProtegida>
            }
            path={"/"}
          />
          <Route element={<Login />} path={"/login"} />
          <Route element={<Perfil />} path={"/perfil"} />
        </Routes>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
};
