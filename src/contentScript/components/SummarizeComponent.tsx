import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CWA = process.env.API_DOMAIN;
const EXTRACTFROMURL = process.env.API_EXTRACT_FROM_URL;

const SummarizeComponent = ({ sendQuestion, setIsGetUrl, setIsOpenUrl, getAnswer, urlChatRef, language }) => {
  const [currentURL, setCurrentURL] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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
        getAnswer("Summarize this website!!!", null, true); 
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
       
        {t("get-main-content")}
      </p>
      <button
        className="cwa_get-url-button"
        onClick={() => {
          getInformation();
        }}
      >
        {t("get-information")}
      </button>
    </div>
  );
};

export default SummarizeComponent;
