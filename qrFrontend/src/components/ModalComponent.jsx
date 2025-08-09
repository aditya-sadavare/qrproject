import React, { useState } from "react";
import Modal from "react-modal";
import Qrcode from "./QRCode";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { CircleX } from "lucide-react"; // Import CircleX icon from Lucide

Modal.setAppElement(document.getElementById("root"));

const ModalComponent = ({ modalIsOpen, closeModal, item, fetchData }) => {
  const [newUrl, setNewUrl] = useState("");

  function handleUrlChange(e) {
    setNewUrl(e.target.value);
  }

  const handleUpdateUrl = async (e) => {
    e.preventDefault();
    if (!item) return;

    const token = Cookie.get("authorization");

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updateurl`, {
        id: item._id,
        newUrl,
        token,
      });
      toast.success(response.data.msg);
      closeModal();
      fetchData();
    } catch (error) {
      toast.error("Error updating URL");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-2xl shadow-lg p-6 w-80 sm:w-96 z-50" // Adjust z-index to ensure modal appears above other content
      overlayClassName="Overlay fixed top-0 left-0 right-0 bottom-0 bg-black-light bg-opacity-50 backdrop-blur z-40" // Ensure overlay is behind modal but above main content
    >
      <div className="flex justify-end">
        <button
          className="text-gray-900 p-2 rounded focus:outline-none"
          onClick={closeModal}
        >
          <CircleX size={40} color="white" />
        </button>
      </div>
      <h2 className="text-xl mb-4">Item Details</h2>
      {item && (
        <div className="mb-4">
          <p className="mb-2">ID: {item._id}</p>
          <p className="mb-2">Username: {item.username}</p>
          <p className="mb-4">URL: {item.orgUrl}</p>
          <Qrcode url={`https://dynamic-qr-server.vercel.app/readqr/${item._id}`} />
        </div>
      )}
      <form onSubmit={handleUpdateUrl} className="mb-4">
        <input
          type="text"
          onChange={(e) => handleUrlChange(e)}
          className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 w-full mb-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter new URL"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          Update URL
        </button>
      </form>
    </Modal>
  );
};

export default ModalComponent;
