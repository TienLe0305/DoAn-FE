import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslation } from "react-i18next";
import {
  SendIcon,
  LoadingIcon,
  ArrowButton,
  UploadFileIcon,
  UploadFileIconInMessage,
  LoadingMessageIcon,
  FileIconSideBar,
  UrlIconSideBar,
  AddNewChatIcon,
  OpenListConversationsIcon,
  CopyIcon,
  UploadImageIcon,
  UploadImageIconInput,
} from "./SVG";
import ChatHistoryList from "./ChatHistoryList";
import { suggestions } from "../suggestion";

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;
const UPLOADFILE = process.env.API_UPLOAD_FILE;
const EXTRACTFROMURL = process.env.API_EXTRACT_FROM_URL;

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

function ChatComponent({ user }) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [isOpenUrl, setIsOpenUrl] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "How can I assist you today?",
      avatar: urls.icon,
      type: "answer",
      image: null,
    },
  ]);
  const [isGetFile, setIsGetFile] = useState(false);
  const [isGetUrl, setIsGetUrl] = useState(false);
  const [isGetImg, setIsGetImg] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [chatHistories, setChatHistories] = useState([]);
  const [isShowChatHistory, setIsShowChatHistory] = useState(false);
  const [chatHistoryId, setChatHistoryId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);

  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const fileChatRef = useRef(null);
  const urlChatRef = useRef(null);
  const inputRefImg = useRef(null);

  let followUpQuestionsPrompts = `
  - Finally, please suggest me 2-3 follow-up questions.
  - Follow-up questions can be related to our conversation.
  - Follow-up questions should help the user understand the content better.
  - Follow-up questions should be short and concise.
  - Follow-up questions should be a single sentence.
  - Follow-up questions should be formated like the follow:
  Follow-up questions:
  - <question 1>
  - <question 2>
  and so on...`;

  useEffect(() => {
    const randomSuggestions = getRandomSuggestions(suggestions, 3);
    setDisplayedSuggestions(randomSuggestions);
  }, []);

  useEffect(() => {
    const messageListener = (request) => {
      if (request.settingUpdate) {
        chrome.storage.local.get(["language"], function (result) {
          if (result.language !== undefined) {
            setLanguage(result.language);
            i18n.changeLanguage(result.language);
          }
        });
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const getRandomSuggestions = (suggestions, count) => {
    const shuffledSuggestions = suggestions.sort(() => 0.5 - Math.random());
    return shuffledSuggestions.slice(0, count);
  };

  const handleOpenUploadFile = () => {
    setIsOpenFile((prev) => !prev);
  };

  const handleOpenGetSummarizeUrl = () => {
    setIsOpenUrl((prev) => !prev);
  };

  const handleOpenUploadImg = () => {
    setIsOpenImg((prev) => !prev);
  };

  useEffect(() => {
    chrome.storage.local.get("language", function (result) {
      if (result.language !== undefined) {
        i18n.changeLanguage(result.language);
      }
    });
    chrome.storage.local.get("auth_token", function (result) {
      setAuthToken(result.auth_token);
    });
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages, followUpQuestions]);

  useEffect(() => {
    setFollowUpQuestions(followUpQuestions);
  }, [followUpQuestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fileChatRef.current && !fileChatRef.current.contains(event.target)) {
        hideFileChat();
      }
      if (urlChatRef.current && !urlChatRef.current.contains(event.target)) {
        hideUrlChat();
      }
      if (inputRefImg.current && !inputRefImg.current.contains(event.target)) {
        hideImgChat();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAnswer = async (text, fileName = null) => {
    let loadingMessage = {
      text: "Thinking...",
      avatar: urls.icon,
      type: "loading",
      image: null,
    };
    setMessages((prevMessage) => [...prevMessage, loadingMessage]);

    const eventSource = new EventSourcePolyfill(
      `${CWA}/${CHAT}?query=${encodeURIComponent(
        text + followUpQuestionsPrompts
      )}&user_email=${encodeURIComponent(user.email)}${
        fileName ? `&file_name=${encodeURIComponent(fileName)}` : ""
      }`
    );

    setIsDisable(true);
    let answer = "";
    let debounceTimer;
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      for (let char of data.text) {
        answer += char;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          let splitAnswer = answer
            .split(/\s*Follow-up questions:/)[0]
            .trimEnd();
          if (splitAnswer === "") {
            splitAnswer = "How can I help you today?";
          }
          let getmess = {
            text: splitAnswer,
            avatar: urls.icon,
            type: "answer",
            image: null,
          };
          setMessages((prevMessage) => [...prevMessage.slice(0, -1), getmess]);
        }, 10);
      }
    });

    return new Promise((resolve) => {
      eventSource.addEventListener("done", (event) => {
        if (answer.includes("Follow-up questions:")) {
          let splitSuggestionQuestion = answer.split("Follow-up questions:");
          let followUpQuestions = splitSuggestionQuestion[1]
            .split("\n")
            .filter((question) => question.startsWith("- "))
            .map((question) => question.substring(2));
          setFollowUpQuestions(followUpQuestions);
        }
        setIsSuggestions(true);
        setIsDisable(false);
        eventSource.close();
        resolve(answer);
      });
    });
  };

  const sendQuestion = async (text, imageUrl = null) => {
    if (text.trim() !== "" && !isDisable) {
      const isFileMessage = text.includes("<file>") && text.includes("</file>");
      const isImageMessage = text.includes("<img>") && text.includes("</img>");
      let newQuestion = {
        text: isFileMessage ? text.replace(/<\/?file>/g, "") : text,
        avatar: user.picture,
        type: isFileMessage ? "file" : isImageMessage ? "img" : "question",
        image: imageUrl,
      };
      setMessages((prevMessage) => [...prevMessage, newQuestion]);
      setMessageText("");
    }
  };

  const chat = async () => {
    sendQuestion(messageText);
    await getAnswer(messageText);
  };

  const handleQuestionClick = (question) => {
    sendQuestion(question);
    getAnswer(question);
    setIsSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedText = messageText.trim();
      if (trimmedText !== "" && !isDisable) {
        chat();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
  };

  const hideFileChat = () => {
    setIsOpenFile(false);
  };

  const hideUrlChat = () => {
    setIsOpenUrl(false);
  };

  const hideImgChat = () => {
    setIsOpenImg(false);
  };

  const hideChatHistoryList = () => {
    setIsShowChatHistory(false);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveChatMessagesToStorage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [messages]);

  const saveChatMessagesToStorage = () => {
    try {
      const timestamp = Date.now();
      const date = new Date();
      const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const newChatHistory = {
        messages,
        createdAt: formattedDate,
        key: timestamp,
      };
      let chatHistories =
        JSON.parse(localStorage.getItem("chatHistories")) || [];
      const existingChatHistoryIndex = chatHistories.findIndex(
        (chatHistory) => chatHistory.key === chatHistoryId
      );
      if (existingChatHistoryIndex !== -1) {
        chatHistories[existingChatHistoryIndex] = newChatHistory;
      } else {
        chatHistories.push(newChatHistory);
        setChatHistoryId(timestamp);
      }
      localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
    } catch (error) {
      console.error("Error saving chat messages to storage:", error);
    }
  };

  const handleNewChat = async () => {
    setFollowUpQuestions([]);
    try {
      const timestamp = Date.now();
      if (messages.length > 0) {
        const date = new Date();
        const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const newChatHistory = {
          messages,
          createdAt: formattedDate,
          key: timestamp,
        };
        let chatHistories =
          JSON.parse(localStorage.getItem("chatHistories")) || [];
        const existingChatHistoryIndex = chatHistories.findIndex(
          (chatHistory) => chatHistory.key === chatHistoryId
        );

        if (existingChatHistoryIndex !== -1) {
          chatHistories[existingChatHistoryIndex] = newChatHistory;
        } else {
          chatHistories.push(newChatHistory);
          setChatHistoryId(timestamp);
        }

        localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
      }
      setMessages([
        {
          text: "How can I assist you today?",
          avatar: urls.icon,
          type: "answer",
          image: null,
        },
      ]);
    } catch (error) {
      console.error("Error creating new chat history:", error);
    }
  };

  const handleOpenListConversations = async () => {
    await getChatHistories();
    setIsShowChatHistory(true);
  };

  const getChatHistories = async () => {
    try {
      const chatHistories =
        JSON.parse(localStorage.getItem("chatHistories")) || [];
      setChatHistories(chatHistories);
    } catch (error) {
      console.error("Error getting chat histories:", error);
    }
  };

  const handleViewChatHistory = (chatHistory) => {
    setMessages(chatHistory.messages);
    setIsShowChatHistory(false);
    setChatHistoryId(chatHistory.key);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleSuggestionClick = async (content) => {
    sendQuestion(content);
    await getAnswer(content);
  };

  const SummarizeComponent = () => {
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
          Click here to get main content from current website and you can
          question about it!!!
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

  const FileChatComponent = () => {
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      sendQuestion(`<file>${file.name}</file>`);
      setIsGetFile(true);
      setIsOpenFile(false);
      try {
        const response = await fetch(`${CWA}/${UPLOADFILE}`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const fileName = file.name;
          setIsGetFile(false);
          getAnswer(`What is the main topic of the document?`, fileName);
        } else {
          console.error("Đã xảy ra lỗi khi gửi file lên BE.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi file lên BE:", error);
      }
    };

    return (
      <div ref={fileChatRef} className="cwa_pdf-uploader">
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <div className="cwa_upload-pdf-container">
          <div className="cwa_upload-pdf-title">
            <h2>
              Tải lên tệp PDF hoặc WORD để nhận bản tóm tắt thông minh và câu
              trả lời!
            </h2>
          </div>
          <div className="cwa_upload-pdf-content">
            <p>
              Tải lên một tệp PDF hoặc WORD để dễ dàng nhận được bản tóm tắt
              thông minh và câu trả lời cho tài liệu của bạn.
            </p>
          </div>
          <label htmlFor="pdf-upload" className="cwa_upload-pdf-footer">
            <UploadFileIcon />
            <p>Loại tệp được hỗ trợ là PDF và WORD</p>
            <p>Kéo file của bạn vào đây hoặc nhấp vào để tải lên</p>
          </label>
        </div>
      </div>
    );
  };

  const ImageChatComponent = () => {
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const imageUrl = URL.createObjectURL(file);
        sendQuestion(`<img>${file.name}</img>`, imageUrl);
        setIsGetImg(true);
        setIsOpenImg(false);
        try {
          const response = await axios.post(
            "http://127.0.0.1:8004/ext/upload_image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const description = response.data.description;
          getAnswer(
            `Provide a detailed description of the following image: ${description}`
          );
          setIsGetImg(false);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
    };

    return (
      <div ref={inputRefImg} className="cwa_img-uploader">
        <input
          type="file"
          id="img-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <div className="cwa_upload-img-container">
          <div className="cwa_upload-img-title">
            <h2>Tải lên hình ảnh để nhận mô tả chi tiết và câu trả lời!</h2>
          </div>
          <div className="cwa_upload-img-content">
            <p>
              Tải lên một hình ảnh để dễ dàng nhận được mô tả chi tiết và câu
              trả lời cho hình ảnh của bạn.
            </p>
          </div>
          <label htmlFor="img-upload" className="cwa_upload-img-footer">
            <UploadImageIconInput />
            <p>Loại tệp được hỗ trợ là hình ảnh</p>
            <p>Kéo hình ảnh của bạn vào đây hoặc nhấp vào để tải lên</p>
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="cwa_chat-content-container">
        {isOpenFile && <FileChatComponent />}
        {isOpenUrl && <SummarizeComponent />}
        {isOpenImg && <ImageChatComponent />}
        <ChatHistoryList
          chatHistories={chatHistories}
          getChatHistories={getChatHistories}
          handleViewChatHistory={handleViewChatHistory}
          hideChatHistoryList={hideChatHistoryList}
          isShowChatHistory={isShowChatHistory}
        />
        <div className="cwa_suggestion-container">
          {displayedSuggestions.map((suggestion, index) => (
            <div className="cwa_box-suggestion">
              <div className="cwa_box-container">
                <div className="cwa_box-suggestion-header">
                  <h3>{suggestion.title}</h3>
                </div>
                <div className="cwa_box-suggestion-content">
                  <p>{suggestion.content}</p>
                </div>
              </div>
              <div
                className="cwa_box-suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion.content)}
              >
                <ArrowButton />
              </div>
            </div>
          ))}
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
                        <LoadingMessageIcon />
                      </div>
                    </div>
                  );
                } else if (message.type === "file") {
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
                        <UploadFileIconInMessage />
                        <div className="cwa_pdf-info">
                          <p>File</p>
                          <div className={`cwa_${message.type}`}>
                            {message.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (message.type === "img") {
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
                        <img
                          className="cwa_upload-img"
                          src={message.image}
                          alt={message.text}
                        />
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
                        <div
                          className="cwa_copy-message"
                          onClick={() => handleCopyMessage(message.text)}
                        >
                          <CopyIcon />
                          <span className="cwa_tooltip">
                            {copied ? "Copied!" : "Copy"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {isSuggestions && (
              <div className="cwa_suggestion-question-container">
                {followUpQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="cwa_suggestion-question-button"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {isGetFile && (
              <div className="cwa_wrapper-container-loading-pdf">
                <div className="loader">
                  <div className="inner one"></div>
                  <div className="inner two"></div>
                  <div className="inner three"></div>
                </div>
                <h1>Đang đọc file, xin vui lòng đợi trong giây lát ...</h1>
              </div>
            )}
            {isGetUrl && (
              <div className="cwa_wrapper-container-loading-pdf">
                <div className="loader">
                  <div className="inner one"></div>
                  <div className="inner two"></div>
                  <div className="inner three"></div>
                </div>
                <h1>
                  Đang xử lí thông tin trang web, xin vui lòng đợi trong giây
                  lát ...
                </h1>
              </div>
            )}
            {isGetImg && (
              <div className="cwa_wrapper-container-loading-pdf">
                <div className="loader">
                  <div className="inner one"></div>
                  <div className="inner two"></div>
                  <div className="inner three"></div>
                </div>
                <h1>Đang xử lí ảnh, xin vui lòng đợi trong giây lát ...</h1>
              </div>
            )}
          </div>
          <div ref={endOfMessagesRef}></div>
        </div>
      </div>
      <div className="cwa_group-btn">
        <div className="cwa_new-chat-btn" onClick={handleNewChat}>
          <AddNewChatIcon isSelected={false} />
          <span className="tooltip-text-group-btn">New Chat</span>
        </div>
        <div
          className="cwa_open-list-conversations-btn"
          onClick={handleOpenListConversations}
        >
          <OpenListConversationsIcon isSelected={false} />
          <span className="tooltip-text-group-btn">List Conversations</span>
        </div>
        <div
          className="cwa_upload-pdf-btn"
          onClick={() => {
            handleOpenUploadFile();
          }}
        >
          <FileIconSideBar isSelected={false} />
          <span className="tooltip-text-group-btn">Upload File</span>
        </div>
        <div
          className="cwa_get-url-btn"
          onClick={() => {
            handleOpenGetSummarizeUrl();
          }}
        >
          <UrlIconSideBar isSelected={false} />
          <span className="tooltip-text-group-btn">Current website</span>
        </div>
        <div
          className="cwa_upload-img-btn"
          onClick={() => {
            handleOpenUploadImg();
          }}
        >
          <UploadImageIcon isSelected={false} />
          <span className="tooltip-text-group-btn">Upload Image</span>
        </div>
      </div>
      <div className="cwa_input-area">
        <input
          type="text"
          ref={inputRef}
          className="cwa_text-value"
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi của bạn..."
          style={{ overflow: "hidden" }}
          disabled={isDisable}
        />
        <button
          className={`cwa_send-button ${
            messageText.trim() !== "" && !isDisable ? "active" : ""
          }`}
          onClick={chat}
          disabled={messageText.trim() === "" || isDisable}
        >
          {isDisable ? (
            <LoadingIcon />
          ) : (
            <SendIcon
              fill={messageText.trim() !== "" && !isDisable ? "#FFF" : "#000"}
            />
          )}
        </button>
      </div>
    </>
  );
}

ChatComponent.propTypes = {};

export default ChatComponent;
