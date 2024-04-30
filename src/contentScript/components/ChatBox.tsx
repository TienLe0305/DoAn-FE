import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import {
  ExitIcon,
  UploadImageIcon,
  ChatIconSideBar,
  QuestionIconSideBar,
  WriteIconSideBar,
  PDFIconSideBar,
  LogoIcon,
} from "./SVG";
import ChatComponent from "./ChatComponent";
import WriteComponent from "./WriteComponent";

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

const ChatBox = ({ user, setIsOpen }) => {
  const { t, i18n } = useTranslation();

  const chatBoxRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get("language", function (result) {
      if (result.language !== undefined) {
        i18n.changeLanguage(result.language);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [selectedComponent, setSelectedComponent] = useState("Chat");

  const handleIconClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div ref={chatBoxRef} id="CWA">
      <div
        className={`cwa_box-chat-container ${
          selectedComponent === "Write" ? "writing" : ""
        }`}
      >
        <div className="cwa_header">
          <div className="cwa_title">
            <LogoIcon />
            <h3 className="cwa_h3">nebulAsisstant</h3>
          </div>
        </div>
        {selectedComponent === "Chat" && <ChatComponent user={user} />}
        {selectedComponent === "Write" && <WriteComponent user={user} />}
      </div>
      <div className="cwa_side-bar-container">
        <div className="cwa_exit-icon" onClick={handleClose}>
          <ExitIcon />
        </div>
        <div
          className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
            selectedComponent === "Chat" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("Chat")}
        >
          <ChatIconSideBar />
          <span className="tooltip-text">Chat</span>
        </div>
        <div
          className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
            selectedComponent === "Question" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("Question")}
        >
          <QuestionIconSideBar />
          <span className="tooltip-text">Question</span>
        </div>
        <div
          className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
            selectedComponent === "Write" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("Write")}
        >
          <WriteIconSideBar />
          <span className="tooltip-text">Write</span>
        </div>
        <div
          className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
            selectedComponent === "Image" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("Image")}
        >
          <UploadImageIcon />
          <span className="tooltip-text">Image</span>
        </div>
        <div
          className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
            selectedComponent === "PDF" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("PDF")}
        >
          <PDFIconSideBar />
          <span className="tooltip-text">PDF</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
