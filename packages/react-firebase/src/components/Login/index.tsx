import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextAuth } from "../../hook";
import { Alert } from "../Alert";

export const Login = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useContextAuth();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      await login(user.email, user.password);
      navigate("/");
    } catch (error: any) {
      console.log(error.message, error.code);
      setError(error.message);
    }
  };

  const handleGoogleSign = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Please enter your email");

    try {
      await resetPassword(user.email);
      setError("we sent you an email with a link to reset your password");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form className="bg-emerald-300 shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            className="shadow appearence-none border rounded w-fullpy-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearence-none border rounded w-fullpy-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-beetween">
          <button
            className="bg-blue-300 hover:bg-blue-700 text-with font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Login
          </button>

          <button
            className="inline-block aling-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            forgot password?
          </button>
        </div>
      </form>

      <p className="my-4 text-sm flex justify-beetween px-3">
        Don´t have account
        <Link
          className="text-blue-400 underline underline-offset-1"
          to={"/register"}
        >
          Register
        </Link>
      </p>

      <button
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-gray-300 py-2 px-4 w-full"
        onClick={handleGoogleSign}
      >
        Login with Google
      </button>
    </div>
  );
};
