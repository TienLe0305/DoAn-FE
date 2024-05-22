import axios from "axios";
import React, { useState, useCallback } from "react";

import ggLoginLogo from "../../static/assets/images/gglogin.png";
import { LogoIcon } from "./SVG";

const CWA = process.env.API_DOMAIN;
const TOKEN = process.env.API_TOKEN;
const LOGIN = process.env.API_LOGIN;

const exchangeCodeForTokens = async (code, state, setErrors) => {
  try {
    const response = await axios.get(
      `${CWA}/${TOKEN}`,
      {
        params: { code: code, state: state },
      }
    );
    if (response.data.access_token && response.data.auth_token) {
      chrome.storage.local.set({ access_token: response.data.access_token });
      chrome.storage.local.set({ auth_token: response.data.auth_token });
      chrome.runtime.sendMessage({ isLogin: true }, () => {
        window.location.reload();
      });
    } else {
      console.log("Access token or auth token not found in response");
    }
  } catch (error) {
    setErrors(error);
  }
};

const Login = () => {
  const [errors, setErrors] = useState("");

  const handleLogin = useCallback(async () => {
    let authUrl = "";
    try {
      const response = await axios.get(
        `${CWA}/${LOGIN}`
      );
      authUrl = response.data.details.url;
    } catch (error) {
      setErrors(error);
      return;
    }

    if (!authUrl) {
      setErrors("Authorization URL is missing");
      return;
    }

    chrome.windows.create(
      {
        url: authUrl,
        focused: true,
        type: "popup",
        width: 600,
        height: 700,
        left: Math.round(window.screen.width / 2) - 600 / 2,
        top: Math.round(window.screen.height / 2) - 700 / 2,
      },
      function (newWindow) {
        const tabUpdateListener = (tabId, changeInfo, tab) => {
          if (tab.windowId === newWindow.id && changeInfo.url) {
            const url = new URL(changeInfo.url);
            const code = url.searchParams.get("code");
            const state = url.searchParams.get("state");
            if (code) {
              exchangeCodeForTokens(code, state, setErrors);
              chrome.tabs.remove(tabId);
              chrome.tabs.onUpdated.removeListener(tabUpdateListener);
            }
          }
        };
        chrome.tabs.onUpdated.addListener(tabUpdateListener);
      }
    );
  }, []);

  return (
    <>
      <div className="cwa_container-popup">
        <div className="cwa_container-logo">
          <LogoIcon />
          <p className="cwa_logo-title login">nebulAsisstant</p>
        </div>
        <button onClick={handleLogin} className="cwa_btn-login">
          <img
            src={ggLoginLogo}
            className="img-fluid icon-gg"
            alt="Google Login"
          />
          Login with Google
        </button>
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
        <div className="wave2 -one"></div>
        <div className="wave2 -two"></div>
        <div className="wave2 -three"></div>
      </div>
    </>
  );
};

export default Login;
