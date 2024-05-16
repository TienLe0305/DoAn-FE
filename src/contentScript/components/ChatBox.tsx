import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import axios from "axios";

import {
  ExitIcon,
  UploadImageIcon,
  ChatIconSideBar,
  QuestionIconSideBar,
  WriteIconSideBar,
  PDFIconSideBar,
  LogoIcon,
  UrlIconSideBar,
} from "./SVG";
import ChatComponent from "./ChatComponent";
import WriteComponent from "./WriteComponent";
import QuestionComponent from "./QuestionComponent";

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

const ChatBox = ({ user, setIsOpen }) => {
  const { t, i18n } = useTranslation();

  const [selectedComponent, setSelectedComponent] = useState("Chat");

  const chatBoxRef = useRef(null);

  const sideBarButtons = [
    { component: "Chat", Icon: ChatIconSideBar },
    { component: "Question", Icon: QuestionIconSideBar },
    { component: "Write", Icon: WriteIconSideBar },
  ];

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

  const handleIconClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div ref={chatBoxRef} id="CWA">
      <div
        className={`cwa_box-chat-container ${
          selectedComponent === "Write"
            ? "writing-component"
            : selectedComponent === "Question"
            ? "question-component"
            : ""
        }`}
      >
        <div className="cwa_header">
          <div className="cwa_title">
            <LogoIcon />
            <h3 className="cwa_h3">nebulAsisstant</h3>
          </div>
        </div>
        {selectedComponent === "Chat" && (
          <ChatComponent
            user={user}
          />
        )}
        {selectedComponent === "Write" && <WriteComponent user={user} />}
        {selectedComponent === "Question" && <QuestionComponent user={user} />}
      </div>
      <div className="cwa_side-bar-container">
        <div className="cwa_exit-icon" onClick={handleClose}>
          <ExitIcon />
        </div>
        {sideBarButtons.map(({ component, Icon }) => (
          <div
            className={`cwa_btn-chat-side-bar cwa-btn-side-bar ${
              selectedComponent === component ? "selected" : ""
            }`}
            onClick={() => {
              handleIconClick(component);
            }}
          >
            {Icon && <Icon isSelected={selectedComponent === component} />}
            <span className="tooltip-text">{component}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
