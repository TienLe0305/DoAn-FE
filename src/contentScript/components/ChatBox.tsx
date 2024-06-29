import React, { useState, useEffect, useRef } from "react";

import {
  ExitIcon,
  ChatIconSideBar,
  QuestionIconSideBar,
  WriteIconSideBar,
  LogoIcon,
  OutlineIcon,
} from "./SVG";
import ChatComponent from "./ChatComponent";
import WriteComponent from "./WriteComponent";
import QuestionComponent from "./QuestionComponent";

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

const ChatBox = ({ user, setIsOpen }) => {
  const [selectedComponent, setSelectedComponent] = useState("Chat");

  const chatBoxRef = useRef(null);

  const sideBarButtons = [
    { component: "Chat", Icon: ChatIconSideBar },
    { component: "Question", Icon: QuestionIconSideBar },
    { component: "Write", Icon: WriteIconSideBar },
  ];

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

  const handleOutlineVideoClick = () => {
    window.location.href = "https://www.outline.video/";
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
        <div
          className={`${
            selectedComponent === "Write" ? "" : "cwa_box-chat-content"
          }`}
        >
          <div className="cwa_header">
            <div className="cwa_title">
              <div className="cwa_title_with_logo">
                <LogoIcon />
                <h3 className="cwa_h3">nebulAsisstant</h3>
              </div>
              <p>Your everyday AI assistant companion</p>
            </div>
          </div>
          {selectedComponent === "Chat" && <ChatComponent user={user} />}
          {selectedComponent === "Write" && <WriteComponent user={user} />}
          {selectedComponent === "Question" && (
            <QuestionComponent user={user} />
          )}
        </div>
      </div>
      <div className="cwa_side-bar-container">
        <div className="cwa_exit-icon" onClick={handleClose}>
          <ExitIcon />
        </div>
        {sideBarButtons.map(({ component, Icon }) => (
          <div
            key={component}
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
        <div
          className="cwa_btn-chat-side-bar cwa-btn-side-bar cwa_outline-video"
          onClick={handleOutlineVideoClick}
        > <OutlineIcon />
          <span className="tooltip-text">Outline Video</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
