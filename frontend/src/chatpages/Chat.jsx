import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../chatcomponents/Contacts";
import { allUsersRoute, host } from "../chatutils/APIRoutes";
import Welcome from "../chatcomponents/Welcome";
import ChatContainer from "../chatcomponents/ChatContainer";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setUserData } from "../chatredux/actions";

export default function Chat() {
  const socket = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [onlineUserIds, setOnlineUserIds] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, { transports : ['websocket'] });
      socket.current.emit("add-user", currentUser._id);
      socket.current.on("online-users", (userId) => {
        setOnlineUserIds(userId);
      })
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          dispatch(setUserData(data.data));
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {/* <Container> */}
        <div className="container1">
          <Contacts
            currentUser={currentUser}
            changeChat={handleChatChange}
            onlineUserIds={onlineUserIds}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              isLoaded={isLoaded}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      {/* </Container> */}
    </>
  );
}

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 100vh;
//     width: 100%;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;
