import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs"

export default function VideoCall() {
  const { id: roomId } = useParams();
  const [ROOM_ID, setROOM_ID] = useState("");
  useEffect(() => {
    console.log(roomId);
    setROOM_ID(roomId);
  }, []);
  
  const socket = io("/");
  const videoGrid = document.getElementById("video-grid");
  const myPeer = new Peer(undefined, {
    host: "/",
    port: "3001",
  });
  const myVideo = document.createElement("video");
  myVideo.muted = true;
  const peers = {};
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream);

      myPeer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    });

  socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
  });

  myPeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
  });

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });

    peers[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.append(video);
  }
  return (
    <>
      <div>VideoCall</div>;<div id="video-grid"></div>
    </>
  );
}
