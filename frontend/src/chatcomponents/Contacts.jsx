import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";
import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";

export default function Contacts({ currentUser, changeChat, onlineUserIds }) {
  const { userData } = useSelector(({ MODULES }) => MODULES);
  console.log(userData);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    /*  <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>B2BMART</h3>
          </div>
          <div className="contacts">
            {userData && userData.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  style={{ borderLeft: `6px solid ${onlineUserIds[contact._id] ? "#00800096" : "#ff00004f" }`, 
                           borderRight: `6px solid ${onlineUserIds[contact._id] ? "#00800096" : "#ff00004f" }`,
                           display: currentUser._id===contact._id ? "none" : ""
                        }}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout />
          </div>
        </Container>
      )}
    </> */
    <>
      <div className="mt-[-28px]">
        <input type="checkbox" className="peer hidden" id="sidebar-open" />
        <label
          className="peer-checked:rounded-full peer-checked:p-2 peer-checked:-right-1 peer-checked:bg-gray-600 peer-checked:text-white absolute top-6  mx-6 cursor-pointer md:hidden "
          htmlFor="sidebar-open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Sidebar Navigation"
          className=" absolute mt-[-20px] peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-300 text-white transition-all md:h-screen md:w-64 lg:w-72"
        >
          <div className="bg-gray-400 mt-5 py-4 pl-10 md:mt-10">
            <span className="">
              <span className="ml-8 inline-flex h-8 w-8  align-bottom text-2xl font-bold text-gray-700">
                B2Bmart
              </span>
            </span>
          </div>
          <ul className="mt-8 space-y-3 md:mt-20">
            {userData &&
              userData.map((contact, index) => (
                <li key={contact._id} className="relative">
                  <button
                    className={`focus:bg-green-400 hover:bg-green-400 flex w-full space-x-2 rounded-md px-10 py-4 items-center ${
                      index === currentSelected
                        ? "bg-green-400"
                        : "bg-gray-100"
                    } text-gray-300 focus:outline-none`}
                    style={{
                      borderLeft: `6px solid ${
                        onlineUserIds[contact._id] ? "green" : "green"
                      }`,
                      borderRight: `6px solid ${
                        onlineUserIds[contact._id] ? "green" : "green"
                      }`,
                    }}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <span className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full border-2 border-green-400"
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    </span>
                    <span className="flex-grow">
                      <p className="font-medium text-gray-900 text-lg">{contact.username}</p>
                    </span>
                  </button>
                </li>
              ))}
          </ul>

          <div className="my-6 mt-auto flex cursor-pointer items-center bg-gray-400 p-4 rounded-lg shadow-md">
            <div className="flex-col">
              <img
                className="h-12 w-12 rounded-full border-2 border-green-400"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="ml-3 flex flex-row text-gray-800 gap-6">
              <p className="font-medium text-lg ml-4">{currentUserName}</p>
              <Logout className="text-green-400 hover:text-green-300 mt-2 ml-4" />
            </div>
          </div>
        </nav>
      </div>
      {/* /Sidebar */}
    </>
  );
}
