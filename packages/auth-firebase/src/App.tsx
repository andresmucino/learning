import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin, Login, Navbar, Reset } from "./components";
import { auth } from "./fireabse";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState<any>(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/admin"}>
            <Admin />
          </Route>
          <Route path={"/reset"}>
            <Reset />
          </Route>
          <Route path={"/"} exact></Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
