import React, { useState, useEffect } from "react";
import { CircleChevronLeft } from "lucide-react";
import logo from "../assets/logo.png";
import SidebarItem from "./SidebarItem";
import Home from "./Home";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ModalComponent from "./ModalComponent";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let token = Cookies.get("authorization");
    axios
      .post("https://dynamic-qr-server.vercel.app/home", { token })
      .then((res) => {
        setItems(res.data);
        toast.success("QR Data Fetched");
      })
      .catch((err) => {
        toast.error("Error while fetching data");
      });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? `w-64` : `md:w-40 w-20`
        } h-screen bg-cover bg-center bg-[url(./assets/sidebackground.jpeg)] shadow-2xl relative transition-all duration-300 p-3 overflow-y-auto overflow-x-hidden`}
      >
        <div className="flex items-center md:ml-2 ml-0">
          <img
            src={logo}
            className={`cursor-pointer md:max-w-20 max-w-[50px] transform ${
              open ? `rotate-360` : ``
            }`}
            alt="Logo"
          />
          <h1 className={`text-white ml-2 text-x ${open ? `` : `hidden`}`}>
            DynamicScanFlow
          </h1>
        </div>
        <ul className="mt-4">
          <SidebarItem items={items} open={open} openModal={openModal} />
        </ul>
      </div>

      {/* Toggle Button */}
      <div
        className={`absolute cursor-pointer top-10 ${
          open ? `md:left-[260px] left-[280px]` : `md:left-[140px] left-[100px]`
        } border-dark bg-white rounded-full z-30 transition-all duration-300`}
        onClick={() => setOpen(!open)}
      >
        <CircleChevronLeft
          size={40}
          className={`${open ? `` : `rotate-180`}`}
        />
      </div>

      {/* Main Content - Blurred */}
      <div
        className={`flex-1 text-2xl font-semibold h-screen overflow-y-auto ${
          open ? "md:blur-none blur-sm" : ""
        }`}
      >
        <Home fetchData={fetchData}/>
      </div>

      {/* Modal Component */}
      <ModalComponent
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        item={selectedItem}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Sidebar;
