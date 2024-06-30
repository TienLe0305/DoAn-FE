import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { EventSourcePolyfill } from "event-source-polyfill";
import {
  SendIcon,
  LoadingIcon,
  ArrowButton,
  UploadFileIconInMessage,
  LoadingMessageIcon,
  FileIconSideBar,
  UrlIconSideBar,
  AddNewChatIcon,
  OpenListConversationsIcon,
  CopyIcon,
  UploadImageIcon,
  PageSummaryIcon,
  SuggestionIcon,
  VoiceIcon,
} from "./SVG";
import ChatHistoryList from "./ChatHistoryList";

import SummarizeComponent from "./SummarizeComponent";
import FileChatComponent from "./FileChatComponent";
import ImageChatComponent from "./ImageChatComponent";

import { getRandomSuggestions } from "../utils/getRandomSuggestion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import hljs from "highlight.js";

import { jpSuggestions } from "../jpSuggestions";
import { viSuggestions } from "../viSuggestions";
import { enSuggestions } from "../enSuggestions";
import axios from "axios";

const languageSuggestions = {
  en: enSuggestions,
  jp: jpSuggestions,
  vi: viSuggestions,
};

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;
const CLEAR_CONTEXT = process.env.API_CLEAR_CONTEXT;
const EXTRACTFROMURL = process.env.API_EXTRACT_FROM_URL;

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

const summaryPrompt =
  "Generate a detailed summary of the current page in Markdown format, highlighting 4-5 key points. Each key point should have a summary keyword in bold. Do not enclose the summary in a code block.";
const suggestionPrompt =
  "Generate a list of insightful questions about the current page. The questions should cover various aspects of the content and provoke thoughtful consideration.";

const followUpQuestionsPrompts = `
- Finally, please suggest me 2-3 follow-up questions.
- Follow-up questions can be related to our conversation.
- Follow-up questions should help the user understand the content better.
- Follow-up questions should be short and concise.
- Follow-up questions should be a single sentence.
- Follow-up questions should be formatted like the following:
Follow-up questions:
- <question 1>
- <question 2>
and so on...
- Always format the line 'Follow-up questions:' regardless of the current language, do not translate this line.`;

const initialMessages = [
  {
    text: "How can I assist you today?",
    avatar: urls.icon,
    type: "answer",
    image: null,
  },
];

const ChatComponent = ({ user }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState();
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [isOpenUrl, setIsOpenUrl] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
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
  const [contextMode, setContextMode] = useState("usingRelevantSources");
  const [includeContext, setIncludeContext] = useState(false);

  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const fileChatRef = useRef(null);
  const urlChatRef = useRef(null);
  const inputRefImg = useRef(null);

  useEffect(() => {
    chrome.storage.local.get(["language"], (result) => {
      if (result.language !== undefined) {
        setLanguage(result.language);
        i18n.changeLanguage(result.language);
      }
    });
  }, []);

  useEffect(() => {
    const messageListener = (request) => {
      if (request.settingUpdate) {
        chrome.storage.local.get(["language"], (result) => {
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
      const suggestions = languageSuggestions[language] || [];
      const randomSuggestions = getRandomSuggestions(suggestions, 3);
      setDisplayedSuggestions(randomSuggestions);
    }
  }, [language]);

  useEffect(() => {
    chrome.storage.local.get("auth_token", (result) => {
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

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveChatMessagesToStorage(messages, chatHistoryId, setChatHistoryId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [messages]);

  const getAnswer = async (text, fileName = null, includeContext) => {
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
      }&include_context=${includeContext}`
    );

    setIsDisable(true);
    let answer = "";
    let debounceTimer;
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      for (let char of data.text) {
        answer += char;
        const processedAnswer = answer
          .replace(/\\\[([^]*?)\\\]/g, "$$$1$$")
          .replace(/\\\(([^]*?)\\\)/g, "$$$1$$");
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          let splitAnswer = processedAnswer
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

  const handleContextModeChange = (event) => {
    const mode = event.target.value;
    setContextMode(mode);
    setIncludeContext(mode === "usingWithPage");
    setFollowUpQuestions([]);
  };

  const chat = async () => {
    sendQuestion(messageText);
    await getAnswer(messageText, null, includeContext);
  };

  const handleQuestionClick = (question) => {
    sendQuestion(question);
    getAnswer(question, null, includeContext);
    setIsSuggestions(false);
    setFollowUpQuestions([]);
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

  useEffect(() => {
    const currentChatMessages = localStorage.getItem("currentChatMessages");
    const currentChatHistoryId = localStorage.getItem("currentChatHistoryId");
    if (currentChatMessages) {
      const parsedMessages = JSON.parse(currentChatMessages);
      if (parsedMessages.length > 0) {
        setMessages(parsedMessages);
        if (currentChatHistoryId) {
          setChatHistoryId(JSON.parse(currentChatHistoryId));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("currentChatMessages", JSON.stringify(messages));
      if (chatHistoryId !== null) {
        localStorage.setItem(
          "currentChatHistoryId",
          JSON.stringify(chatHistoryId)
        );
      }
    } else {
      localStorage.removeItem("currentChatMessages");
      localStorage.removeItem("currentChatHistoryId");
    }
  }, [messages, chatHistoryId]);

  const saveChatMessagesToStorage = (
    messages,
    chatHistoryId,
    setChatHistoryId
  ) => {
    if (messages.length === 0) {
      return;
    }

    const savedChatHistories =
      JSON.parse(localStorage.getItem("chatHistories")) || [];
    if (chatHistoryId !== null) {
      const updatedHistories = savedChatHistories.map((history) => {
        if (history.key === chatHistoryId) {
          return { ...history, messages };
        }
        return history;
      });
      localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    } else {
      const newChatHistory = {
        key: Date.now(),
        messages,
        createdAt: new Date().toLocaleString(),
      };
      const updatedHistories = [...savedChatHistories, newChatHistory];
      localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
      setChatHistoryId(newChatHistory.key);
    }
  };

  const handleNewChat = async () => {
    setFollowUpQuestions([]);
    if (messages.length > 0) {
      saveChatMessagesToStorage(messages, chatHistoryId, setChatHistoryId);
    }
    setMessages([]);
    setChatHistoryId(null);

    try {
      const response = await axios.get(`${CWA}/${CLEAR_CONTEXT}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getChatHistories = () => {
    const savedChatHistories =
      JSON.parse(localStorage.getItem("chatHistories")) || [];
    setChatHistories(savedChatHistories);
  };

  const handleOpenListConversations = () => {
    if (messages.length > 0) {
      saveChatMessagesToStorage(messages, chatHistoryId, setChatHistoryId);
    }
    getChatHistories();
    setIsShowChatHistory(true);
  };

  const handleViewChatHistory = (chatHistory) => {
    setMessages(chatHistory.messages);
    setIsShowChatHistory(false);
    setChatHistoryId(chatHistory.key);
  };

  const hideChatHistoryList = () => {
    setIsShowChatHistory(false);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleOpenUploadFile = () => {
    setIsOpenFile((prev) => !prev);
  };

  const handleOpenUploadImg = () => {
    setIsOpenImg((prev) => !prev);
  };

  const [voices, setVoices] = useState([]);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = null;
      }
    };
  }, []);

  const handleReadMessage = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    let voiceLang;
    switch (language) {
      case "jp":
        voiceLang = "ja-JP";
        break;
      case "vi":
        voiceLang = "vi-VN";
        break;
      case "en":
      default:
        voiceLang = "en-US";
        break;
    }

    utterance.lang = voiceLang;
    const voice = voices.find((v) => v.lang.startsWith(voiceLang));
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const renderMessage = (message, index) => {
    if (message.type === "loading") {
      return (
        <div key={index} className={`cwa_content-mess cwa_${message.type}`}>
          <img className="cwa_message-avatar user" src={message.avatar} />
          <div className={`cwa_message-content cwa_${message.type}`}>
            <LoadingMessageIcon />
          </div>
        </div>
      );
    } else if (message.type === "file") {
      return (
        <div key={index} className={`cwa_content-mess cwa_${message.type}`}>
          <img className="cwa_message-avatar user" src={message.avatar} />
          <div className={`cwa_message-content cwa_${message.type}`}>
            <UploadFileIconInMessage />
            <div className="cwa_pdf-info">
              <p>File</p>
              <div className={`cwa_${message.type}`}>{message.text}</div>
            </div>
          </div>
        </div>
      );
    } else if (message.type === "img") {
      return (
        <div key={index} className={`cwa_content-mess cwa_${message.type}`}>
          <img className="cwa_message-avatar user" src={message.avatar} />
          <div className={`cwa_message-content cwa_${message.type}`}>
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
        <div key={index} className={`cwa_content-mess cwa_${message.type}`}>
          <img className="cwa_message-avatar user" src={message.avatar} />
          <div className={`cwa_message-content cwa_${message.type}`}>
            <span className={`cwa_${message.type}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <>
                        <header>{match[1]}</header>
                        <code
                          className={className}
                          {...props}
                          dangerouslySetInnerHTML={{
                            __html: hljs.highlight(
                              children ? children.toString() : "",
                              { language: match[1] }
                            ).value,
                          }}
                        />
                      </>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.text}
              </ReactMarkdown>
            </span>
            <div
              className="cwa_copy-message"
              onClick={() => handleCopyMessage(message.text)}
            >
              <CopyIcon />
              <span className="cwa_tooltip">{copied ? "Copied!" : "Copy"}</span>
            </div>
            <div
              className="cwa_read-message"
              onClick={() => handleReadMessage(message.text)}
            >
              <VoiceIcon />
              <span className="cwa_tooltip">Read</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderSuggestionQuestions = useMemo(
    () =>
      isSuggestions && (
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
      ),
    [isSuggestions, followUpQuestions]
  );

  const renderLoadingState = useMemo(
    () =>
      (isGetFile || isGetUrl || isGetImg) && (
        <div className="cwa_wrapper-container-loading-pdf">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
          <h1>
            {isGetFile
              ? t("wait-read-file")
              : isGetUrl
                ? t("wait-process-url")
                : t("wait-process-img")}
          </h1>
        </div>
      ),
    [isGetFile, isGetUrl, isGetImg]
  );

  const sendURLToBackend = async (url, setIsGetUrl, getAnswer, prompt) => {
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
        getAnswer(prompt, null, true);
      } else {
        console.error("Đã xảy ra lỗi khi gửi url lên BE.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCurrentURL = async (setIsGetUrl, getAnswer, prompt, isSummary) => {
    chrome.runtime.sendMessage({ action: "getCurrentURL" }, (response) => {
      if (response && response.currentURL) {
        sendURLToBackend(response.currentURL, setIsGetUrl, getAnswer, prompt);
        setIsGetUrl(true);
        setIncludeContext(true);
        setContextMode("usingWithPage");
        setFollowUpQuestions([]);
        sendQuestion(
          `${
            isSummary
              ? "Generate page summary"
              : "Suggest question about this page"
          }`
        );
      } else {
        console.error("Failed to get current URL");
      }
    });
  };

  useEffect(() => {
    setIncludeContext(contextMode === "usingWithPage" || contextMode === "usingFileData");
  }, [contextMode]);

  return (
    <>
      <div className="cwa_chat-content-container">
        {isOpenFile && (
          <FileChatComponent
            sendQuestion={sendQuestion}
            setIsGetFile={setIsGetFile}
            setIsOpenFile={setIsOpenFile}
            getAnswer={getAnswer}
            fileChatRef={fileChatRef}
            language={language}
            setContextMode={setContextMode}
          />
        )}
        {isOpenUrl && (
          <SummarizeComponent
            sendQuestion={sendQuestion}
            setIsGetUrl={setIsGetUrl}
            setIsOpenUrl={setIsOpenUrl}
            getAnswer={getAnswer}
            urlChatRef={urlChatRef}
            language={language}
          />
        )}
        {isOpenImg && (
          <ImageChatComponent
            sendQuestion={sendQuestion}
            setIsGetImg={setIsGetImg}
            setIsOpenImg={setIsOpenImg}
            getAnswer={getAnswer}
            inputRefImg={inputRefImg}
            language={language}
          />
        )}
        <ChatHistoryList
          chatHistories={chatHistories}
          getChatHistories={getChatHistories}
          handleViewChatHistory={handleViewChatHistory}
          hideChatHistoryList={hideChatHistoryList}
          isShowChatHistory={isShowChatHistory}
        />
        <div className="cwa_suggestion-container">
          <p>
            Hi {user.name}, see what's possible with nebulAssistant in this
            website
          </p>
          <div className="cwa_suggestion-card-list">
            <div
              className="cwa_suggestion-card"
              onClick={() => {
                getCurrentURL(setIsGetUrl, getAnswer, summaryPrompt, true);
              }}
            >
              <PageSummaryIcon />
              <p>Generate page summary</p>
            </div>
            <div
              className="cwa_suggestion-card"
              onClick={() => {
                getCurrentURL(setIsGetUrl, getAnswer, suggestionPrompt, false);
              }}
            >
              <SuggestionIcon />
              <p>Suggest question about this page</p>
            </div>
          </div>
        </div>
        <div className="cwa_messages-container">
          <div className="cwa_messages">
            {messages.length > 0 &&
              messages.map((message, index) => renderMessage(message, index))}
            {renderSuggestionQuestions}
            {renderLoadingState}
          </div>
          <div ref={endOfMessagesRef}></div>
        </div>
      </div>
      <div className="cwa_group-btn">
        <select
          value={contextMode}
          onChange={handleContextModeChange}
          className="cwa_custom-select"
        >
          <option value="usingWithPage">Using with page</option>
          <option value="usingRelevantSources">Using relevant sources</option>
          <option value="usingFileData">Using file data</option>
        </select>
        <div className="cwa_new-chat-btn" onClick={handleNewChat}>
          <AddNewChatIcon isSelected={false} />
          <span className="tooltip-text-group-btn">{t("new-chat")}</span>
        </div>
        <div
          className="cwa_open-list-conversations-btn"
          onClick={handleOpenListConversations}
        >
          <OpenListConversationsIcon isSelected={false} />
          <span className="tooltip-text-group-btn">{t("list-cvs")}</span>
        </div>
        <div
          className="cwa_upload-pdf-btn"
          onClick={() => {
            handleOpenUploadFile();
          }}
        >
          <FileIconSideBar isSelected={false} />
          <span className="tooltip-text-group-btn">{t("upload-file")}</span>
        </div>
        <div
          className="cwa_upload-img-btn"
          onClick={() => {
            handleOpenUploadImg();
          }}
        >
          <UploadImageIcon isSelected={false} />
          <span className="tooltip-text-group-btn">{t("upload-img")}</span>
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
          placeholder={t("type-message")}
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
};

ChatComponent.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ChatComponent);
