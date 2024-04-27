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
} from "./SVG";

const urls = {
  logo: chrome.runtime.getURL("assets/images/logo.png"),
  icon: chrome.runtime.getURL("assets/images/icon.png"),
};

function ChatComponent({ user }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      text: "",
      avatar: "",
      type: "",
    },
  ]);

  const [isDisable, setIsDisable] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);

  const [authToken, setAuthToken] = useState(null);
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);

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
          `http://127.0.0.1:8001/ext/chat_history?user_email=${encodeURIComponent(
            user.email
          )}`
        )
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
      `http://127.0.0.1:8001/ext/chat?query=${encodeURIComponent(
        messageText
      )}&user_email=${encodeURIComponent(user.email)}`
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

  const chat = async () => {
    sendQuestion();
    await getAnswer();
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

  return (
    <>
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
                    <div className={`cwa_message-content cwa_${message.type}`}>
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
                    <div className={`cwa_message-content cwa_${message.type}`}>
                      <p className={`cwa_${message.type}`}>{message.text}</p>
                    </div>
                  </div>
                );
              }
            })}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
      <div className="cwa_tip">
        <div className="cwa_scissors-icon">
          <ScissorsIcon />
        </div>
        <div className="cwa_upload-image-icon">
          <UploadImageIcon />
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
          {isDisable ? <LoadingIcon /> : <SendIcon />}
        </button>
      </div>
    </>
  );
}

ChatComponent.propTypes = {};

export default ChatComponent;
