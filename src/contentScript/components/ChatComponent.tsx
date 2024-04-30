import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslation } from "react-i18next";
import {
  SendIcon,
  ScissorsIcon,
  LoadingIcon,
  UploadImageIcon,
  ArrowButton,
  UploadPDFIcon,
} from "./SVG";

const urls = {
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

function ChatComponent({ user, isPDF, onPDFOpen }) {
  const { t, i18n } = useTranslation();
  const [isOpenPDF, setIsOpenPDF] = useState(isPDF);
  const [messages, setMessages] = useState([
    {
      text: "",
      avatar: "",
      type: "",
    },
  ]);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  let followUpQuestionsPrompts = `- Finally, please suggest me 2-3 follow-up questions.
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
    onPDFOpen(isOpenPDF);
  }, [isOpenPDF]);

  useEffect(() => {
    setIsOpenPDF(isPDF);
  }, [isPDF]);

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
    getChatHistory();
  }, [authToken]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const getChatHistory = () => {
    if (authToken) {
      axios
        .get(
          `http://127.0.0.1:8004/ext/chat_history?user_email=${encodeURIComponent(
            user.email
          )}`
        )
        .then((res) => {
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

  const getAnswer = async (formData = null) => {
    let loadingMessage = {
      text: "Thinking...",
      avatar: urls.icon,
      type: "loading",
    };
    setMessages((prevMessage) => [...prevMessage, loadingMessage]);

    const eventSource = new EventSourcePolyfill(
      `http://127.0.0.1:8004/ext/chat?query=${encodeURIComponent(
        messageText
      )}&user_email=${encodeURIComponent(user.email)}`,
      formData ? { body: formData } : {}
    );

    setIsDisable(true);
    let answer = "";
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      for (let char of data.text) {
        answer += char;
        let getmess = {
          text: answer,
          avatar: urls.icon,
          type: "answer",
        };
        setMessages((prevMessage) => [...prevMessage.slice(0, -1), getmess]);
      }
    });

    return new Promise((resolve) => {
      eventSource.addEventListener("done", (event) => {
        setIsDisable(false);
        eventSource.close();
        resolve(answer);
      });
    });
  };

  const getFollowUpQuestions = async (answer) => {
    const eventSource = new EventSourcePolyfill(
      `http://127.0.0.1:8004/ext/chat?query=${encodeURIComponent(
        answer + followUpQuestionsPrompts
      )}&user_email=${encodeURIComponent(user.email)}`
    );
    let followUpQuestions = "";

    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);
      for (let char of data.text) {
        followUpQuestions += char;
      }
    });

    eventSource.addEventListener("done", (event) => {
      const lines = followUpQuestions.split("\n");
      const followUpQuestionsIndex = lines.findIndex((line) =>
        line.includes("Follow-up questions:")
      );
      if (followUpQuestionsIndex !== -1) {
        const questions = lines
          .slice(followUpQuestionsIndex + 1)
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => line.trim().substring(2));
        setFollowUpQuestions(questions);
        setIsSuggestions(true);
      } else {
        setFollowUpQuestions([]);
      }

      eventSource.close();
    });
  };

  useEffect(() => {
    setFollowUpQuestions(followUpQuestions);
  }, [followUpQuestions]);

  const handleQuestionClick = (question) => {
    setMessageText(question);
    setIsSuggestions(false);
  };

  const chat = async () => {
    sendQuestion();
    const answer = await getAnswer();
    await getFollowUpQuestions(answer);
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

  const pdfChatRef = useRef(null);

  const hidePDFChat = () => {
    setIsOpenPDF(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pdfChatRef.current && !pdfChatRef.current.contains(event.target)) {
        hidePDFChat(); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  const PDFChatComponent = () => {
    const handlePdfUpload = async (e) => {
      const file = e.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
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
              Tải lên PDF bằng tiếng Việt và chỉ cung cấp cho tôi bản dịch chính
              xác!
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
                        <p className={`cwa_${message.type} cwa_loading`}>
                          {message.text}
                        </p>
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
            <div ref={endOfMessagesRef} />
          </div>
        </div>
      </div>
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
