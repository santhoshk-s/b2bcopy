import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { host } from "../chatutils/APIRoutes";
import { io } from "socket.io-client";

export default function Logout() {
  const socket = useRef();
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem("chat-app-user"))._id;

    socket.current = io(host, { transports: ["websocket"] });
    socket.current.emit("logout", id);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-2 rounded-lg bg-purple-500 cursor-pointer border-none"
    >
      <BiPowerOff className="text-xl text-purple-100" />
    </button>
  );
}
