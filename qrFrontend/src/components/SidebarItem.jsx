import React from "react";
import { QrCode } from "lucide-react";

function SidebarItem({ items, open, openModal }) {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer relative md:p-2 md:mb-3 mb-3 duration-300 ${open ? "" : "overflow-hidden"}`}
        >
          <li
            className={`duration-300 flex items-center text-white backdrop-blur-xl shadow-2xl ${open ? "w-100 h-[50px] rounded-full justify-start pl-4" : "md:w-20 md:h-20 w-10 h-10 rounded-full justify-center"}`}
            onClick={() => openModal(item)}
          >
            <div className="flex items-center duration-300">
              <QrCode className={`duration-300 ${open ? "" : "md:size-[50px] size-[25px]"}`} size={24} />
              <span className={`duration-300 origin-left duration-200 mx-2 ${open ? "" : "hidden"}`}>
                {item.orgUrl}
              </span>
            </div>
          </li>
        </div>
      ))}
    </>
  );
}

export default SidebarItem;
