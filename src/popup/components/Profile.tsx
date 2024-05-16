import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import { DirectToDashboardIcon, JPFlag, LogoIcon, USFlag, VNFlag } from "./SVG";
import imgBackround from "../../static/assets/images/test.png";
const HOST = process.env.HOST;

const languageOptions = [
  { value: "en", label: "EN", image: <USFlag /> },
  { value: "vi", label: "VN", image: <VNFlag /> },
  { value: "jp", label: "JP", image: <JPFlag /> },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderRadius: "10px",
    background: "#F6F6F6",
    width: "120px",
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "white" : "black",
    backgroundColor: state.isFocused ? "#56bb55b3" : "white",
  }),
};

const formatOptionLabel = ({ value, label, image }) => (
  <div className="d-flex align-items-center gap-2">
    {image}
    <div className="fw-bold">{label}</div>
  </div>
);

const clearLocalStorage = (setUser) => {
  chrome.storage.local.remove("auth_token");
  chrome.storage.local.remove("user", function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      setUser("");
    }
  });
};

const Logout = ({ user, setUser }) => {
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(
    languageOptions.find((option) => option.value === i18n.language)
  );
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    getCheckedStatus();
  }, []);

  const getCheckedStatus = () => {
    chrome.storage.local.get("checked", function (result) {
      if (result.checked !== undefined) {
        setIsChecked(result.checked);
      } else {
        chrome.storage.local.set({ checked: true });
      }
    });
  };

  const handleLogout = useCallback(() => {
    clearLocalStorage(setUser);
    chrome.runtime.sendMessage({ isLogin: false }, () => {
      window.location.reload();
    });
  }, [setUser]);

  const executeNewScript = (data) => {
    chrome.storage.local.set(data, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) return;
        const currentTabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: currentTabId },
            files: ["contentScript.js"],
          },
          () => {
            chrome.tabs.sendMessage(currentTabId, { cleanup: true });
          }
        );
      });
    });
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    i18n.changeLanguage(selectedOption.value);
    executeNewScript({ language: selectedOption.value });
  };

  const handleCheckboxChange = useCallback((event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    executeNewScript({ checked: isChecked });
  }, []);

  return (
    <>
      <div className="cwa_container-popup-login-success">
        <div className="cwa_container-img">
          <img src={imgBackround}></img>
        </div>
        <div className="cwa_container-header">
          <div className="cwa_container-logo">
            <LogoIcon />
            <p className="cwa_logo-title">nebulAsisstant</p>
          </div>
        </div>
        <div className="cwa_container-body">
          <div className="cwa_profile-with-language">
            <div className="cwa_user-container">
              <div className="cwa_user-avatar">
                <img src={user.picture}></img>
              </div>
              <p className="cwa_user-name">{user.name}</p>
            </div>
            <Select
              options={languageOptions}
              formatOptionLabel={formatOptionLabel}
              value={selectedOption}
              styles={customStyles}
              onChange={handleLanguageChange}
              isSearchable={false}
            />
          </div>
          <a
            href={HOST}
            target="_blank"
            className="cwa_container-visit-dashboard"
          >
            <div className="cwa_visit-dashboard-div">
              <p className="cwa_visit-dashboard-label">
                {t("visit")} Dashboard
              </p>
              <div className="cwa_visit-dashboard-icon">
                <DirectToDashboardIcon />
              </div>
            </div>
          </a>
        </div>
        <div className="cwa_container-footer">
          <button onClick={handleLogout} className="cwa_btn-logout">
            <p>{t("logout")}</p>
          </button>
        </div>
        {/* <div className="wave3 -one"></div>
        <div className="wave3 -two"></div>
        <div className="wave3 -three"></div>
        <div className="wave4 -one"></div>
        <div className="wave4 -two"></div>
        <div className="wave4 -three"></div> */}
      </div>
    </>
  );
};

export default Logout;
