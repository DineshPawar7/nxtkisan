import React, { useState } from "react";
import {
  FaHome,
  FaRobot,
  FaTractor,
  FaPlusCircle,
  FaUser,
  FaCamera,
  FaVideo,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CreatePost from "../pages/CreatePost";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [createType, setCreateType] = useState(null);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/chatbot", icon: <FaRobot />, label: "AI" },
    { to: "/", icon: <FaRobot />, label: "Market" },
    { to: "/mandibhav", icon: <FaTractor />, label: "Mandibhav" },
  ];

  const handleCreate = (type) => {
    setCreateType(type);
    setShowSubMenu(false);
  };

  const closeModal = () => setCreateType(null);

  return (
    <>
      <div
        className={`${
          isOpen ? "w-[220px]" : "w-[80px]"
        } h-screen transition-all duration-300 fixed flex flex-col items-center border-r border-gray-300 bg-white z-40 shadow-md
          max-[550px]:w-full max-[550px]:h-[60px] max-[550px]:flex-row max-[550px]:justify-around max-[550px]:bottom-0 max-[550px]:top-auto max-[550px]:border-t max-[550px]:border-r-0`}
      >
        <div
          className="text-orange-500 font-bold text-[22px] mt-5 mb-5 text-center cursor-pointer max-[550px]:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          NxtKisan
        </div>

        <ul className="flex flex-col items-center gap-4 w-full max-[550px]:flex-row max-[550px]:justify-around max-[550px]:gap-0">
          {navItems.map(({ to, icon, label }, index) => (
            <li key={index} className="group relative">
              <Link
                to={to}
                className="flex flex-col items-center justify-center w-[70px] h-[70px] rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:from-[#ec8e00] hover:to-[#cf4319] hover:scale-105 transition-all duration-200 ease-in-out
                max-[550px]:w-[50px] max-[550px]:h-[50px]"
              >
                <div className="text-[24px]">{icon}</div>
                {isOpen && <span className="text-sm">{label}</span>}
              </Link>
              {!isOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {label}
                </div>
              )}
            </li>
          ))}

          {/* Create Button */}
          <li
            onClick={() => setShowSubMenu(!showSubMenu)}
            className="group relative flex flex-col items-center justify-center w-[70px] h-[70px] rounded-2xl cursor-pointer bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:from-[#ec8e00] hover:to-[#cf4319] hover:scale-105 transition-all duration-200
            max-[550px]:w-[50px] max-[550px]:h-[50px]"
          >
            <FaPlusCircle className="text-[24px]" />
            {isOpen && <span className="text-sm">Create</span>}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                Create
              </div>
            )}
          </li>

          <li className="group relative">
            <Link
              to="/profile"
              className="flex flex-col items-center justify-center w-[70px] h-[70px] rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:from-[#ec8e00] hover:to-[#cf4319] hover:scale-105 transition-all duration-200
              max-[550px]:w-[50px] max-[550px]:h-[50px]"
            >
              <FaUser className="text-[24px]" />
              {isOpen && <span className="text-sm">Profile</span>}
            </Link>
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                Profile
              </div>
            )}
          </li>
        </ul>

        {showSubMenu && (
          <ul
            className="absolute left-[100%] top-1/2 -translate-y-1/2 flex flex-col gap-3 backdrop-blur-md p-2 rounded-xl bg-white/80 shadow-xl transition-all duration-300
            max-[768px]:left-[90px]
            max-[550px]:flex-row max-[550px]:left-0 max-[550px]:top-auto max-[550px]:translate-y-0 max-[550px]:bottom-[65px] max-[550px]:backdrop-blur-sm"
          >
            <li
              onClick={() => handleCreate("photo")}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <FaCamera />
            </li>
            <li
              onClick={() => handleCreate("video")}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <FaVideo />
            </li>
            <li
              onClick={() => handleCreate("article")}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <FaFileAlt />
            </li>
          </ul>
        )}
      </div>

      {createType && <CreatePost type={createType} closeModal={closeModal} />}
    </>
  );
};

export default Sidebar;
