import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslation } from "react-i18next";
import {
  AlertIcon,
  ExitIcon,
  RemoveIcon,
  SendIcon,
  TipIcon,
  LoadingIcon,
} from "./SVG";

const CWA = process.env.API_DOMAIN;
const HISTORY = process.env.API_HISTORY;
const MOTD = process.env.API_MOTD;
const CATEGORY = process.env.API_CATEGORY;
const CHAT = process.env.API_CHAT;

const urls = {
  logo: chrome.runtime.getURL("assets/images/logo.png"),
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

const ChatBox = ({ user, setIsOpen }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      text: "",
      avatar: "",
      type: "",
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([
    {
      id: "84d8f206-048c-4915-a655-fb2d20a512d6",
      title: "CWA Guidelines",
    },
  ]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});

  const [isDisable, setIsDisable] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isGuideLines, setIsGuideLines] = useState(true);
  const [hasAtLeastOneCategory, setHasAtLeastOneCategory] = useState(false);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [motd, setMotd] = useState("");
  const [titlesCategory, setTitlesCategory] = useState("");
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");

  const [authToken, setAuthToken] = useState(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (hasAtLeastOneCategory) {
      setTimeout(() => {
        setHasAtLeastOneCategory(false);
      }, 3000);
    }
  }, [hasAtLeastOneCategory]);

  useEffect(() => {
    checkScrollButtons();

    let newTitles = selectedCategories
      .map((category) => category.title)
      .join(", ");
    setTitlesCategory(newTitles);

    updateColorCategories();
  }, [selectedCategories]);

  useEffect(() => {
    chrome.storage.local.get("language", function (result) {
      if (result.language !== undefined) {
        i18n.changeLanguage(result.language);
      }
    });
    checkScrollwithKeyDown();
    getCategoriesUsing();
    chrome.storage.local.get("auth_token", function (result) {
      console.log(result.auth_token);
      setAuthToken(result.auth_token);
    });
    if (selectedCategories.length === 0) {
      setHasAtLeastOneCategory(true);
    }
  }, []);

  useEffect(() => {
    getMotd();
    getCategories();
    getChatHistory();
  }, [authToken]);

  useEffect(() => {
    if (showCategories) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showCategories]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  useEffect(() => {
    if (!isGuideLines) {
      if (
        selectedCategories.length === 1 &&
        selectedCategories[0].title === "CWA Guidelines"
      ) {
        chrome.storage.local.set({ checked: true });
        setHasAtLeastOneCategory(true);
        return;
      }
      const filtered = selectedCategories.filter(
        (category) => category.title !== "CWA Guidelines"
      );
      setSelectedCategories(filtered);
    }
  }, [isGuideLines]);

  const checkScrollwithKeyDown = () => {
    checkScrollButtons();
    document.addEventListener("keydown", handleKeyDownEsc);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEsc);
    };
  };

  const getCategoriesUsing = () => {
    chrome.storage.local.get(["category"], function (result) {
      if (result.category && Array.isArray(result.category)) {
        const newCategories = result.category.map((item) => ({
          id: item.id,
          title: item.title,
        }));
        setSelectedCategories((prevCategories) => {
          const uniqueCategories = [...prevCategories];
          newCategories.forEach((newCategory) => {
            if (
              !uniqueCategories.find(
                (category) => category.title === newCategory.title
              )
            ) {
              uniqueCategories.push(newCategory);
            }
          });
          return uniqueCategories;
        });
      }
    });
    chrome.storage.local.get("checked", function (result) {
      setIsGuideLines(result.checked);
    });
  };

  const getMotd = () => {
    if (authToken) {
      axios
        .get(`${CWA}/${MOTD}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setMotd(res.data.details);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const getChatHistory = () => {
    if (authToken) {
      axios
        .get(`http://127.0.0.1:8011/ext/chat_history`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          console.log(res.data, "history");
          const formattedMessages = res.data
            .map((message) => {
              return [
                {
                  text: message.user_ask,
                  avatar: user.picture,
                  type: "question",
                },
                {
                  text: message.assistant_answer,
                  avatar: urls.icon,
                  type: "answer",
                },
              ];
            })
            .flat();
          setMessages(formattedMessages);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const getCategories = () => {
    if (authToken != null) {
      axios
        .get(`${CWA}/${CATEGORY}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const initialCategories = res.data.details.map((category) => ({
            id: category.id,
            title: category.category_name,
            description: category.category_description,
          }));
          setCategories(initialCategories);
        })
        .catch((error) => setError(error));
    }
  };

  const sendQuestion = async () => {
    if (messageText.trim() !== "" && !isDisable) {
      let newQuestion = {
        text: messageText,
        avatar: user.picture,
        type: "question",
      };
      setMessages((prevMessage) => [...prevMessage, newQuestion]);
      setMessageText("");
    }
  };

  const getAnswer = async () => {
    let loadingMessage = {
      text: "Thinking...",
      avatar: urls.icon,
      type: "loading",
    };
    setMessages((prevMessage) => [...prevMessage, loadingMessage]);

    const eventSource = new EventSourcePolyfill(
      `http://127.0.0.1:8011/ext/chat?query=${encodeURIComponent(messageText)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    setIsDisable(true);
    let answer = "";
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "response");

      for (let char of data.text) {
        answer += char;
        console.log(answer, "answer");
        let getmess = {
          text: answer,
          avatar: urls.icon,
          type: "answer",
        };
        setMessages((prevMessage) => [...prevMessage.slice(0, -1), getmess]);
      }
    });

    eventSource.addEventListener("done", (event) => {
      setIsDisable(false);
      eventSource.close();
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    inputRef.current.style.height = "100%";
    setMessageText(value);
    if (value.includes("@")) {
      setShowCategories(true);
      const searchTerm = value.split("@")[1];
      const filtered = categories.filter((category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(
        filtered.filter(
          (category) =>
            !selectedCategories
              .map((item) => item.title)
              .includes(category.title)
        )
      );
    } else {
      setShowCategories(false);
      setFilteredCategories([]);
    }
  };

  const chat = async () => {
    sendQuestion();
    await getAnswer();
  };

  const scrollToCategory = (index) => {
    const dropdownElement = dropdownRef.current;
    const categoryElement = dropdownElement.querySelector(
      `[data-index="${index}"]`
    );

    if (categoryElement) {
      const dropdownTop = dropdownElement.scrollTop;
      const dropdownBottom = dropdownTop + dropdownElement.offsetHeight;
      const categoryTop = categoryElement.offsetTop;
      const categoryBottom = categoryTop + categoryElement.offsetHeight;

      if (categoryTop < dropdownTop) {
        dropdownElement.scrollTop = categoryTop;
      } else if (categoryBottom > dropdownBottom) {
        dropdownElement.scrollTop =
          categoryBottom - dropdownElement.offsetHeight;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (showCategories) {
      let newSelectedCategoryIndex;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        newSelectedCategoryIndex =
          selectedCategoryIndex > 0
            ? selectedCategoryIndex - 1
            : filteredCategories.length - 1;
        setSelectedCategoryIndex(newSelectedCategoryIndex);
        scrollToCategory(newSelectedCategoryIndex);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        newSelectedCategoryIndex =
          selectedCategoryIndex < filteredCategories.length - 1
            ? selectedCategoryIndex + 1
            : 0;
        setSelectedCategoryIndex(newSelectedCategoryIndex);
        scrollToCategory(newSelectedCategoryIndex);
      } else if (e.key === "Enter" && filteredCategories.length > 0) {
        e.preventDefault();
        handleCategorySelect(filteredCategories[selectedCategoryIndex]);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!isDisable) {
        chat();
      }
    }
  };

  const handleCategorySelect = (category) => {
    setMessageText("");
    setShowCategories(false);
    setFilteredCategories([]);

    setSelectedCategories((prevCategories) => [...prevCategories, category]);

    chrome.storage.local.get("category", function (result) {
      const currentCategories = result.category || [];
      const updatedCategories = [...currentCategories, category];
      chrome.storage.local.set({ category: updatedCategories });
    });
  };

  const handleTagRemove = (categoryTitle) => {
    if (selectedCategories.length > 1) {
      const updatedCategories = selectedCategories.filter(
        (item) => item.title !== categoryTitle
      );
      setSelectedCategories(updatedCategories);
      setFilteredCategories(
        categories.filter((category) =>
          updatedCategories.map((item) => item.title).includes(category.title)
        )
      );
      chrome.storage.local.set({ category: updatedCategories });
    } else {
      setHasAtLeastOneCategory(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".cwa_autocomplete-dropdown")) return;
    setShowCategories(false);
  };

  const handlePrevClick = () => {
    const slider = document.querySelector(".cwa_category-list");
    const containerWidth = slider.clientWidth;
    const scroll = Math.min(scrollX + containerWidth, 0);
    setScrollX(scroll);
  };

  const handleNextClick = () => {
    const slider = document.querySelector(".cwa_category-list");
    const scrollWidth = slider.scrollWidth;
    const containerWidth = slider.clientWidth;
    const scroll = Math.max(
      scrollX - containerWidth,
      -scrollWidth + containerWidth
    );
    setScrollX(scroll);
  };

  const updateColorCategories = () => {
    const updateColorCategory = {};
    selectedCategories.forEach((category) => {
      if (!categoryColors[category.title]) {
        updateColorCategory[category.title] = getRandomColor();
      } else {
        updateColorCategory[category.title] = categoryColors[category.title];
      }
    });
    setCategoryColors((prevColors) => ({
      ...prevColors,
      ...updateColorCategory,
    }));
  };

  const checkScrollButtons = () => {
    const slider = document.querySelector(".cwa_category-list");
    if (!slider) return;

    const scrollWidth = slider.scrollWidth;
    const containerWidth = slider.clientWidth;
    setShowScrollButtons(scrollWidth > containerWidth);
  };

  const handleKeyDownEsc = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getRandomColor = () => {
    let color = "rgba(";
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 256) + ",";
    }
    color += "0.2)";
    return color;
  };

  return (
    <div ref={chatBoxRef} id="CWA">
      <div>
        <div className="cwa_header">
          <div className="cwa_title">
            <img src={urls.logo} alt="logo" />
            <h3 className="cwa_h3">CWAssistant</h3>
          </div>
          <div className="cwa_exit-icon" onClick={handleClose}>
            <ExitIcon />
          </div>
        </div>
        <div className="cwa_categories-container">
          <div className="cwa_categories">
            <ul
              className="cwa_category-list"
              style={{ transform: `translateX(${scrollX}px)` }}
            >
              {selectedCategories.length > 0 &&
                selectedCategories.map((category, index) => (
                  <li
                    key={index}
                    className="cwa_category-item"
                    style={{ backgroundColor: categoryColors[category.title] }}
                  >
                    <span className="cwa_tag-name">{category.title}</span>
                    {category.title !== "CWA Guidelines" && (
                      <button
                        className="cwa_remove-tag"
                        onClick={() => handleTagRemove(category.title)}
                      >
                        <RemoveIcon />
                      </button>
                    )}
                  </li>
                ))}
            </ul>
            {showScrollButtons && (
              <>
                <button className="cwa_prev-btn" onClick={handlePrevClick}>
                  ❮
                </button>
                <button className="cwa_next-btn" onClick={handleNextClick}>
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
        <div className="cwa_messages-container">
          <div className="cwa_messages">
            {messages.length > 0 &&
              messages.map((message, index) => {
                if (message.type === "loading") {
                  return (
                    <div
                      key={index}
                      className={`cwa_content-mess cwa_${message.type}`}
                    >
                      <img
                        className="cwa_message-avatar user"
                        src={message.avatar}
                      />
                      <div
                        className={`cwa_message-content cwa_${message.type}`}
                      >
                        <p className={`cwa_${message.type} cwa_loading`}>
                          {message.text}
                        </p>
                        {/* <small className="cwa_message-time">
                          {t("references")} : {message.reference}
                        </small> */}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={`cwa_content-mess cwa_${message.type}`}
                    >
                      <img
                        className="cwa_message-avatar user"
                        src={message.avatar}
                      />
                      <div
                        className={`cwa_message-content cwa_${message.type}`}
                      >
                        <p className={`cwa_${message.type}`}>{message.text}</p>
                        {/* {message.type === "answer" && (
                          <small className="cwa_message-time">
                            {t("references")} : {message.reference}
                          </small>
                        )} */}
                      </div>
                    </div>
                  );
                }
              })}
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        <div className="cwa_tip">
          <i className="cwa_icon-tip">
            <TipIcon />
          </i>
          <h3 className="cwa_h3-tip">{t("tips")}</h3>
        </div>
        <div className="cwa_input-area">
          <input
            type="text"
            ref={inputRef}
            className="cwa_text-value"
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={motd}
            style={{ overflow: "hidden" }}
          />
          {showCategories && (
            <div className="cwa_autocomplete-dropdown" ref={dropdownRef}>
              <ul>
                {filteredCategories.length === 0 ? (
                  <li className="cwa_no-category">{t("no-category")}</li>
                ) : (
                  filteredCategories.map((category, index) => (
                    <div
                      key={index}
                      data-index={index}
                      onClick={() => handleCategorySelect(category)}
                      className={`cwa_container-catagory  ${
                        index === selectedCategoryIndex ? "selected" : ""
                      }`}
                    >
                      <h3 className="cwa_category-title">{category.title}</h3>
                      <span className="cwa_category-description">
                        {category.description}
                      </span>
                    </div>
                  ))
                )}
              </ul>
            </div>
          )}
          <button
            className={`cwa_send-button ${
              messageText.trim() !== "" && !isDisable ? "active" : ""
            }`}
            onClick={chat}
          >
            {isDisable ? <LoadingIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
      <div
        className={`cwa_error-message cwa_chat-box ${
          hasAtLeastOneCategory ? "" : "cwa_hide-error"
        }`}
        onClick={() => setHasAtLeastOneCategory(false)}
      >
        <span
          className={`${hasAtLeastOneCategory ? "cwa_countdown" : ""}`}
        ></span>
        <div className="cwa_alert-icon">
          <AlertIcon />
        </div>
        <p>You must choose at least 1 category !</p>
      </div>
    </div>
  );
};

export default ChatBox;
