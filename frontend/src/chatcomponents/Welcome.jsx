import React from "react";
import Robot from "../chatassets/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <div className="flex flex-col justify-center items-center text-gray-700">
      <img src={Robot} alt="Robot" className="h-80" />
      <h1 className="text-3xl mt-5">
        Welcome, <span className="text-[#4e0eff]">{currentUser.username}!!</span>
      </h1>
      <h3 className="text-xl text-center mt-2 text-gray-700">Please select a chat to Start Messaging</h3>
    </div>
  );
}
