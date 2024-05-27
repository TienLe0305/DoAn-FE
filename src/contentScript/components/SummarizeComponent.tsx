import React, { useState } from "react";
import axios from "axios";

const CWA = process.env.API_DOMAIN;
const EXTRACTFROMURL = process.env.API_EXTRACT_FROM_URL;

const SummarizeComponent = ({ sendQuestion, setIsGetUrl, setIsOpenUrl, getAnswer, urlChatRef }) => {
  const [currentURL, setCurrentURL] = useState("");

  const getCurrentURL = async () => {
    chrome.runtime.sendMessage({ action: "getCurrentURL" }, (response) => {
      if (response && response.currentURL) {
        setCurrentURL(response.currentURL);
        sendQuestion(`Summarize this website!!!`);
        setIsGetUrl(true);
        setIsOpenUrl(false);
        sendURLToBackend(response.currentURL);
      } else {
        console.error("Failed to get current URL");
      }
    });
  };

  const sendURLToBackend = async (url) => {
    try {
      const response = await axios.post(
        `${CWA}/${EXTRACTFROMURL}`,
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsGetUrl(false);
        getAnswer("Summarize this website!!!");
      } else {
        console.error("Đã xảy ra lỗi khi gửi url lên BE.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getInformation = async () => {
    await getCurrentURL();
  };

  return (
    <div ref={urlChatRef} className="cwa_get-current-url">
      <p>
        Click here to get main content from current website and you can question
        about it!!!
      </p>
      <button
        className="cwa_get-url-button"
        onClick={() => {
          getInformation();
        }}
      >
        Get Information
      </button>
    </div>
  );
};

export default SummarizeComponent;
