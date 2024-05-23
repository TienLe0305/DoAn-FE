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
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-beetween",
    alignItems: "center",
  }),
};

const formatOptionLabel = ({ value, label, image }) => (
  <div className="d-flex align-items-center justify-content-center">
    <div className="cwa_image-language">{image}</div>
    <div className="fw-bold">{label}</div>
  </div>
);

const clearLocalStorage = (setUser) => {
  chrome.storage.local.remove("auth_token");
  chrome.storage.local.remove("language");
  chrome.storage.local.remove("contentScriptReady");
  chrome.storage.local.remove("user", function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      setUser("");
    }
  });
};

const Profile = ({ user, setUser }) => {
  const { t, i18n } = useTranslation();
  const [filteredLanguageOptions, setFilteredLanguageOptions] =
    useState(languageOptions);
  const [selectedOption, setSelectedOption] = useState(
    languageOptions.find((option) => option.value === i18n.language)
  );

  useEffect(() => {
    const newOptions = languageOptions.filter(
      (option) => option.value !== i18n.language
    );
    setFilteredLanguageOptions(newOptions);
  }, [i18n.language]);

  const handleLogout = useCallback(() => {
    clearLocalStorage(setUser);
    chrome.runtime.sendMessage({ isLogin: false }, () => {
      window.location.reload();
    });
  }, [setUser]);

  const executeNewScript = (data) => {
    chrome.storage.local.set(data, () => {
      chrome.runtime.sendMessage({ settingUpdate: true });
    });
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    i18n.changeLanguage(selectedOption.value);
    executeNewScript({ language: selectedOption.value });
    const newOptions = languageOptions.filter(
      (option) => option.value !== selectedOption.value
    );
    setFilteredLanguageOptions(newOptions);
  };

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
              options={filteredLanguageOptions}
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

export default Profile;
