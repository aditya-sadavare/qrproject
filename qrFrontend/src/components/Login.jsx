import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  console.log("helloooooo");

  function handleSubmit(e) {
    e.preventDefault();
    const url = isLogin
      ? `${import.meta.env.VITE_BACKEND_URL}/login`
      : `${import.meta.env.VITE_BACKEND_URL}/reg`;
    const payload = isLogin ? { username, pass } : { username, pass, name };

    axios
      .post(url, payload)
      .then((res) => {
        toast.info(res.data.msg);
        Cookies.set("authorization", res.data.token, {
          sameSite: "strict",

          //secure: true,
        });

        if (isLogin && res.data.msg === "Login successful") {
          navigate("/home");
        }

      })
      .catch((err) => toast.error(err));
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url(./assets/background.jpg)]">
      <div className="container mx-[20px] md:mx-[500px] text-white rounded-[30px] p-8 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <img src="/logo.png" className="max-w-[150px]" alt="Logo"></img>
          <div className="rounded-lg py-4">
            <label htmlFor="username" className="font-bold">
              User Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-2 border-white focus:border-gray-500 text-white p-2"
              id="username"
              placeholder="Username ex.abc-123"
              size="50"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="rounded-lg py-4">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                className="form-control bg-transparent border-2 border-white focus:border-gray-500 text-white p-2"
                placeholder="Name ex.John"
                size="50"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="rounded-lg py-4">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent border-2 border-white focus:border-gray-500 text-white p-2"
              placeholder="password ex.abc@123"
              size="50"
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              className="form-control border-2 border-white text-black whitespace-nowrap md:px-10"
            >
              {isLogin ? "LOGIN" : "SIGN UP"}
            </button>
            <label htmlFor="button" className="font-bold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </label>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="form-control border-2 border-white text-black whitespace-nowrap md:px-10"
            >
              {isLogin ? "Switch to Signup" : "Switch to Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
