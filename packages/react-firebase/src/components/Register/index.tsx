import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextAuth } from "../../hook";
import { Alert } from "../Alert";

export const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { singup } = useContextAuth();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError("");
      await singup(user.email, user.password);
      navigate("/");
    } catch (error: any) {
      console.log(error.message, error.code);
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form className="bg-blue-500 shadow-md px-8 pt-6 pb-8mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:online-none focus: shadow-outline"
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:online-none focus: shadow-outline"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-blue-300 hover:bg-blue-700 text-with font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>

      <p className="my-4 text-sm flex justify-beetween px-3">
        Already have an account
        <Link
          to="/login"
          className="text-blue-400 underline underline-offset-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
