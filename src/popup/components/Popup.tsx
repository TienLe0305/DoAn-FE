import axios from "axios";
import React, { useEffect, useState } from "react";

import Logout from "./Profile";
import Login from "./Login";
import LoadingIndicator from "./LoadingIndicator";

const CWA = process.env.API_DOMAIN;
const USER = process.env.API_USER;

const Popup = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    id: "",
    picture: "",
  });
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    getAuthToken();
    loadMessage();
  }, []);

  useEffect(() => {
    getUser();
  }, [authToken]);

  const getAuthToken = () => {
    chrome.storage.local.get(["auth_token"], function (result) {
      if (result.auth_token) {
        console.log("auth_token", result.auth_token);
        setAuthToken(result.auth_token);
      } else {
        setAuthToken("");
      }
    });
  };

  const loadMessage = () => {
    chrome.runtime.sendMessage({ loading: "load" });
    chrome.storage.local.get(["load"], function (result) {
      setTimeout(function () {
        setLoading(result.load);
      }, 500);
    });
  };

  const getUser = () => {
    console.log("authToken", authToken);
    if (authToken) {
      axios
        .get(`http://127.0.0.1:8004/ext/who_am_i`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data.details);
          chrome.storage.local.set({ user: res.data.details });
        })
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator loading={loading} />;
    } else {
      if (authToken !== "") {
        return <Logout user={user} setUser={setUser} />;
      } else {
        return <Login />;
      }
    }
  };

  return <>{renderContent()}</>;
};

export default Popup;
