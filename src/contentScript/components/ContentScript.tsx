import React, { useEffect, useState } from "react";

import { CloseCWA } from "./SVG";
import ChatBox from "./ChatBox";

const logo = chrome.runtime.getURL("assets/images/logo.png");

const ContentScript = () => {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    id: "",
    picture: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  useEffect(() => {
    statusIconVisible();
    getUserInfo();
  }, []);

  const statusIconVisible = () => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "q") {
        setIsIconVisible((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  };

  const getUserInfo = () => {
    chrome.storage.local.get(["user"], function (result) {
      if (result.user) {
        setUser(result.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const toggleChatBox = () => {
    setIsChatBoxVisible((prevState) => !prevState);
  };

  const hideIcon = (event) => {
    event.stopPropagation();
    setIsIconVisible(false);
  };

  if (!isLoggedIn) {
    return null;
  }

  chrome.runtime.onMessage.addListener((request) => {
    if (request.cleanup) {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <div id="CWA">
        <div onClick={toggleChatBox}>
          {isIconVisible && (
            <div className="cwa_container-icon">
              <div className="cwa_close" onClick={hideIcon}>
                <CloseCWA />
              </div>
              <div
                className="cwa_view-icon cwa_gl-tooltip cwa_gl-tooltip-left"
                tooltip-data="CO-WELL Assistant"
              >
                <div className="cwa_view-icon-item">
                  <img src={logo} className="cwa_custom-img" alt="Logo"></img>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`cwa_container-chat cwa_chat-box ${
            isChatBoxVisible ? "" : "cwa_hide"
          }`}
          id="cwa_chat-box"
        >
          <ChatBox user={user} setIsOpen={setIsChatBoxVisible} />
        </div>
      </div>
    </>
  );
};
export default ContentScript;
