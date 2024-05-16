import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslation } from "react-i18next";
import {
  SendIcon,
  LoadingIcon,
  ArrowButton,
  UploadPDFIcon,
  UploadPDFIconInMessage,
  LoadingMessageIcon,
  PDFIconSideBar,
  UrlIconSideBar,
  AddNewChatIcon,
  OpenListConversationsIcon,
} from "./SVG";
import ChatHistoryList from "./ChatHistoryList";

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;
const HISTORY = process.env.API_HISTORY;
const UPLOADPDF = process.env.API_UPLOAD_PDF;

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

function ChatComponent({ user }) {
  const { t, i18n } = useTranslation();
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [isOpenUrl, setIsOpenUrl] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "How can I assist you today?",
      avatar: urls.icon,
      type: "answer",
    },
  ]);
  const [isGetPdfFile, setIsGetPdfFile] = useState(false);
  const [isGetUrl, setIsGetUrl] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [chatHistories, setChatHistories] = useState([]);
  const [isShowChatHistory, setIsShowChatHistory] = useState(false);
  const [chatHistoryId, setChatHistoryId] = useState(null);

  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const pdfChatRef = useRef(null);
  const urlChatRef = useRef(null);

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

  const handleOpenUploadPDF = () => {
    setIsOpenPDF((prev) => !prev);
  };

  const handleOpenGetSummarizeUrl = () => {
    setIsOpenUrl((prev) => !prev);
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

  // useEffect(() => {
  //   getChatHistory();
  // }, [authToken]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages, followUpQuestions]);

  useEffect(() => {
    setFollowUpQuestions(followUpQuestions);
  }, [followUpQuestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pdfChatRef.current && !pdfChatRef.current.contains(event.target)) {
        hidePDFChat();
      }
      if (urlChatRef.current && !urlChatRef.current.contains(event.target)) {
        hideUrlChat();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const getChatHistory = () => {
  //   if (authToken) {
  //     axios
  //       .get(`${CWA}/${HISTORY}?user_email=${encodeURIComponent(user.email)}`)
  //       .then((res) => {
  //         const formattedMessages = res.data
  //           .map((message) => {
  //             const isPdfMessage =
  //               message.user_ask.includes("<pdf>") &&
  //               message.user_ask.includes("</pdf>");
  //             const userAsk = isPdfMessage
  //               ? message.user_ask.replace(/<\/?pdf>/g, "")
  //               : message.user_ask;

  //             return [
  //               {
  //                 text: userAsk,
  //                 avatar: user.picture,
  //                 type: isPdfMessage ? "pdf" : "question",
  //               },
  //               {
  //                 text: message.assistant_answer,
  //                 avatar: urls.icon,
  //                 type: "answer",
  //               },
  //             ];
  //           })
  //           .flat();
  //         setMessages(formattedMessages);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //   }
  // };

  const getAnswer = async (text, pdf_name = null) => {
    let loadingMessage = {
      text: "Thinking...",
      avatar: urls.icon,
      type: "loading",
    };
    setMessages((prevMessage) => [...prevMessage, loadingMessage]);

    const eventSource = new EventSourcePolyfill(
      `${CWA}/${CHAT}?query=${encodeURIComponent(
        text + followUpQuestionsPrompts
      )}&user_email=${encodeURIComponent(user.email)}${
        pdf_name ? `&pdf_name=${encodeURIComponent(pdf_name)}` : ""
      }`
    );

    setIsDisable(true);
    let answer = "";
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      for (let char of data.text) {
        answer += char;
        let splitAnswer = answer.split("Follow-up questions:")[0].trimEnd();
        if (splitAnswer === "") {
          splitAnswer = "How can I help you today?";
        }
        let getmess = {
          text: splitAnswer,
          avatar: urls.icon,
          type: "answer",
        };
        setMessages((prevMessage) => [...prevMessage.slice(0, -1), getmess]);
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

  const sendQuestion = async (text) => {
    if (text.trim() !== "" && !isDisable) {
      const isPdfMessage = text.includes("<pdf>") && text.includes("</pdf>");
      let newQuestion = {
        text: isPdfMessage ? text.replace(/<\/?pdf>/g, "") : text,
        avatar: user.picture,
        type: isPdfMessage ? "pdf" : "question",
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
      if (!isDisable) {
        chat();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
  };

  const hidePDFChat = () => {
    setIsOpenPDF(false);
  };

  const hideUrlChat = () => {
    setIsOpenUrl(false);
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
      const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const newChatHistory = {
        messages,
        createdAt: formattedDate,
        key: timestamp,
      };
      let chatHistories = JSON.parse(localStorage.getItem("chatHistories")) || [];
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

  // const handleNewChat = async () => {
  //   setFollowUpQuestions([]);
  //   setMessages([
  //     {
  //       text: "How can I assist you today?",
  //       avatar: urls.icon,
  //       type: "answer",
  //     },
  //   ]);
  //   try {
  //     const timestamp = Date.now();
  //     if (messages.length > 0) {
  //       const date = new Date();
  //       const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
  //         date.getMonth() + 1
  //       }/${date.getFullYear()}`;
  //       const newChatHistory = {
  //         messages,
  //         createdAt: formattedDate,
  //         key: timestamp,
  //       };
  //       let chatHistories =
  //         JSON.parse(localStorage.getItem("chatHistories")) || [];
  //       const existingChatHistoryIndex = chatHistories.findIndex(
  //         (chatHistory) => chatHistory.key === chatHistoryId
  //       );

  //       if (existingChatHistoryIndex !== -1) {
  //         chatHistories[existingChatHistoryIndex] = newChatHistory;
  //       } else {
  //         chatHistories.push(newChatHistory);
  //         setChatHistoryId(timestamp);
  //       }

  //       localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
  //     }
  //     setMessages([]);
  //   } catch (error) {
  //     console.error("Error creating new chat history:", error);
  //   }
  // };

  const handleNewChat = async () => {
    setFollowUpQuestions([]);
  
    try {
      const chatHistories = JSON.parse(localStorage.getItem("chatHistories")) || [];
      const lastChatHistory = chatHistories[chatHistories.length - 1];
      if (lastChatHistory) {
        setMessages(lastChatHistory.messages);
        setChatHistoryId(lastChatHistory.key);
      } else {
        setMessages([
          {
            text: "How can I assist you today?",
            avatar: urls.icon,
            type: "answer",
          },
        ]);
      }
    } catch (error) {
      console.error("Error retrieving chat messages from storage:", error);
      setMessages([
        {
          text: "How can I assist you today?",
          avatar: urls.icon,
          type: "answer",
        },
      ]);
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

  useEffect(() => {
    handleNewChat();
  }, []);

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
          "http://127.0.0.1:8003/ext/extract_from_url",
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

  const PDFChatComponent = () => {
    const handlePdfUpload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      sendQuestion(`<pdf>${file.name}</pdf>`);
      setIsGetPdfFile(true);
      setIsOpenPDF(false);
      try {
        const response = await fetch(`${CWA}/${UPLOADPDF}`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const pdfName = file.name;
          setIsGetPdfFile(false);
          getAnswer(`What is the main topic of the document?`, pdfName);
        } else {
          console.error("Đã xảy ra lỗi khi gửi file PDF lên BE.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi file PDF lên BE:", error);
      }
    };

    return (
      <div ref={pdfChatRef} className="cwa_pdf-uploader">
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf"
          onChange={handlePdfUpload}
          style={{ display: "none" }}
        />
        <div className="cwa_upload-pdf-container">
          <div className="cwa_upload-pdf-title">
            <h2>
              Tải lên tệp PDF để nhận bản tóm tắt thông minh và câu trả lời!
            </h2>
          </div>
          <div className="cwa_upload-pdf-content">
            <p>
              Tải lên một tệp PDF để dễ dàng nhận được bản tóm tắt thông minh và
              câu trả lời cho tài liệu của bạn.
            </p>
          </div>
          <label htmlFor="pdf-upload" className="cwa_upload-pdf-footer">
            <UploadPDFIcon />
            <p>Loại tệp được hỗ trợ là PDF</p>
            <p>Kéo PDF của bạn vào đây hoặc nhấp vào để tải lên</p>
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="cwa_chat-content-container">
        {isOpenPDF && <PDFChatComponent />}
        {isOpenUrl && <SummarizeComponent />}
        <ChatHistoryList
          chatHistories={chatHistories}
          getChatHistories={getChatHistories}
          handleViewChatHistory={handleViewChatHistory}
          hideChatHistoryList={hideChatHistoryList}
          isShowChatHistory={isShowChatHistory}
        />
        <div className="cwa_suggestion-container">
          <div className="cwa_box-suggestion">
            <div className="cwa_box-container">
              <div className="cwa_box-suggestion-header">
                <h3>🤓 Explain a complicated thing</h3>
              </div>
              <div className="cwa_box-suggestion-content">
                <p>
                  Explain Artificial Intelligence so I can explain it for my six
                  year old.
                </p>
              </div>
            </div>
            <div className="cwa_box-suggestion-btn">
              <ArrowButton />
            </div>
          </div>
          <div className="cwa_box-suggestion">
            <div className="cwa_box-container">
              <div className="cwa_box-suggestion-header">
                <h3>🧠 Get suggestions and generate new ideas</h3>
              </div>
              <div className="cwa_box-suggestion-content">
                <p>Please give me the 10 best coding ideas in the world.</p>
              </div>
            </div>
            <div className="cwa_box-suggestion-btn">
              <ArrowButton />
            </div>
          </div>
          <div className="cwa_box-suggestion">
            <div className="cwa_box-container">
              <div className="cwa_box-suggestion-header">
                <h3>💭 Translate, summarize, correct grammar and more...</h3>
              </div>
              <div className="cwa_box-suggestion-content">
                <p>Translate "I love you", into French.</p>
              </div>
            </div>
            <div className="cwa_box-suggestion-btn">
              <ArrowButton />
            </div>
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
                        <LoadingMessageIcon />
                      </div>
                    </div>
                  );
                } else if (message.type === "pdf") {
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
                        <UploadPDFIconInMessage />
                        <div className="cwa_pdf-info">
                          <p>File</p>
                          <div className={`cwa_${message.type}`}>
                            {message.text}
                          </div>
                        </div>
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
            {isGetPdfFile && (
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
            handleOpenUploadPDF();
          }}
        >
          <PDFIconSideBar isSelected={false} />
          <span className="tooltip-text-group-btn">PDF</span>
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
        />
        <button
          className={`cwa_send-button ${
            messageText.trim() !== "" && !isDisable ? "active" : ""
          }`}
          onClick={chat}
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
