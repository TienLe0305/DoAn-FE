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

  const handleKeyDownEsc = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [selectedComponent, setSelectedComponent] = useState("Chat");

  const handleIconClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div ref={chatBoxRef} id="CWA">
      <div className={`cwa_box-chat-container ${selectedComponent === 'Write' ? 'writing' : ''}`}>
        <div className="cwa_header">
          <div className="cwa_title">
            {/* <img src={urls.logo} alt="logo" /> */}
            <LogoIcon />
            <h3 className="cwa_h3">nebulAsisstant</h3>
          </div>
          <div className="cwa_exit-icon" onClick={handleClose}>
            <ExitIcon />
          </div>
        </div>
        {selectedComponent === "Chat" && <ChatComponent user={user} />}
        {selectedComponent === 'Write' && <WriteComponent user={user}/>}
      </div>
      <div className="cwa_side-bar-container">
        <div
          className="cwa_btn-chat-side-bar cwa-btn-side-bar"
          onClick={() => handleIconClick("Chat")}
        >
          <ChatIconSideBar />
        </div>
        <div
          className="cwa_btn-question-side-bar cwa-btn-side-bar"
          onClick={() => handleIconClick("Question")}
        >
          <QuestionIconSideBar />
        </div>
        <div
          className="cwa_btn-write-side-bar cwa-btn-side-bar"
          onClick={() => handleIconClick("Write")}
        >
          <WriteIconSideBar />
        </div>
        <div
          className="cwa_btn-image-side-bar cwa-btn-side-bar"
          onClick={() => handleIconClick("Image")}
        >
          <UploadImageIcon />
        </div>
        <div
          className="cwa_btn-chat-pdf-side-bar cwa-btn-side-bar"
          onClick={() => handleIconClick("PDF")}
        >
          <PDFIconSideBar />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;