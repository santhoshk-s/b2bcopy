import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../chatassets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../chatutils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
        const base64 = bufferToBase64(response.data);
        data.push(base64);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    const bufferToBase64 = (buffer) => {
      const uint8Array = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      return window.btoa(binary);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-[#131324]">
          <img src={loader} alt="loader" className="max-w-full" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-12 bg-[#131324] h-screen w-screen">
          <div className="text-center text-white text-2xl">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`border-4 border-transparent p-2 rounded-full flex justify-center items-center transition-transform duration-500 ${
                  selectedAvatar === index ? "border-[#4e0eff]" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  className="h-24 transition-transform duration-500 cursor-pointer"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            className="bg-[#4e0eff] text-white py-3 px-6 rounded-md font-bold text-lg uppercase hover:bg-[#4e0eff]"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
