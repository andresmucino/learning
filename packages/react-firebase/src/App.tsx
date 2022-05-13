import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./components";

export const App = () => {
  return (
    <div className="bg-slate-300 h-screen text-blue flex">
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* </AuthProvider> */}
    </div>
  );
};
