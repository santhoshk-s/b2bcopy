import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [isFile, setIsFile] = useState(false);
  const [fileState, setFileState] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (isFile) {
      handleSendMsg(fileState, true);
    } else if (msg.length > 0) {
      handleSendMsg(msg, false);
      setMsg("");
    }
  };

  useEffect(() => {
    if (fileState) {
      setMsg(fileState.name);
      setIsFile(true);
    }
  }, [fileState]);

  return (
    <div className="flex items-center sm:px-6 md:px-8 lg:px-12 gap-1 sm:gap-2 md:gap-2 absolute bottom-0 left-0 mb-2 resize-none bg-white">
      <div className="relative flex items-center text-black ">
        
        {/* {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2">
            <Picker
              onEmojiClick={handleEmojiClick}
              className="bg-[#080420] shadow-lg border-[#9a86f3]"
              disableSearchBar
              native
            />
          </div>
        )} */}
      </div>
      <label htmlFor="input-file" className="text-black cursor-pointer ">
        {/* <AttachFileIcon className="text-xl sm:text-2xl" /> */}
        <input
          id="input-file"
          type="file"
          hidden
          accept="*"
          onChange={(e) => setFileState(e.target.files[0])}
        />
      </label>
      <form
        className="flex items-center gap-4 sm:gap-6 md:gap-8 w-full bg-[#ffffff34] rounded-2xl"
        onSubmit={(e) => sendChat(e)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          disabled={isFile}
          className="flex-1 w-full h-10 sm:h-12  text-white border-none pl-3 sm:pl-4 text-base sm:text-lg focus:outline-none rounded-lg placeholder-white bg-[#1D4ED8] px-12"
        />
        <ClearIcon
          sx={{
            display: isFile ? "" : "none",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsFile(false);
            setMsg("");
          }}
          className="text-base sm:text-lg"
        />
        <button
          type="submit"
          className="cursor-pointer py-3 px-4 sm:px-6 md:px-8  sm:py-2 rounded-2xl bg-[#1D4ED8] flex justify-center items-center border-none"
        >
          <IoMdSend className="text-white text-lg sm:text-2xl" />
        </button>
      </form>
    </div>
  );
}
