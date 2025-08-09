import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Qrcode from "./QRCode";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/sidebackground.jpeg";
import ModalComponent from "./ModalComponent";

const Home = ({fetchData}) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const t = Cookie.get("authorization");
    if (t === undefined) {
      navigate("/");
    } else {
      setToken(t);
    }
  }, []);

  const [orgUrl, setOrgUrl] = useState("my-website");
  const [url, setUrl] = useState("my-website");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addqr`, { token, orgUrl })
      .then((res) => {
        toast.info(res.data.msg);
        setUrl(`${process.env.REACT_APP_BACKEND_URL}/readqr/${res.data.uid}`);
        fetchData()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen md:text-lg text-sm"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full text-white px-4">
        <Qrcode url={url} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-4 bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg max-w-md w-full md:max-w-lg"
        >
          <input
            type="text"
            className="border border-gray-300 p-2 bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded w-full"
            onChange={(e) =>
              setOrgUrl(e.target.value === "" ? "my-website" : e.target.value)
            }
            placeholder="Enter URL ex. www.google.com"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 w-full"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Modal Component */}
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        fetchData={() => fetchData()}
        item={null}
      />
    </div>
  );
};

export default Home;
