import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../fireabse";
import { Firestore } from "../firestore";

export const Admin = () => {
  const [user, setUser] = React.useState<any>(null);
  const history = useHistory()

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("el usuario existe");
      setUser(auth.currentUser);
    } else {
      console.log("no exite el usuario");
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">Admin</h3>
      {user && <Firestore user={user} />}
    </div>
  );
};
