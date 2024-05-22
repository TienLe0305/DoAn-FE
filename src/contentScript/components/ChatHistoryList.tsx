import React, { useState } from "react";
import { HideListConversationsIcon } from "./SVG";

const ChatHistoryList = ({
  chatHistories,
  getChatHistories,
  handleViewChatHistory,
  hideChatHistoryList,
  isShowChatHistory
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleDelete = (index) => {
    const updatedChatHistories = [...chatHistories];
    updatedChatHistories.splice(index, 1);
    localStorage.setItem("chatHistories", JSON.stringify(updatedChatHistories));
    getChatHistories();
  };

  return (
    <div
      className={`cwa_chat-history-container ${
        isShowChatHistory ? "show" : ""
      }`}
    >
      <div className="cwa_chat-history-header">
        <p>Lịch sử cuộc hội thoại</p>
      </div>
      <div className="cwa_hide-chat-history-list" onClick={hideChatHistoryList}><HideListConversationsIcon /></div>
      
      <div className="cwa_chat-history-list">
        {chatHistories.map((chatHistory, index) => {
          return (
            <div
              key={index}
              className="cwa_chat-history-btn-container"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                className="cwa_chat-history-btn"
                onClick={() => handleViewChatHistory(chatHistory)}
              >
                {chatHistory.messages[0].text} - {chatHistory.createdAt}
                {hoveredIndex === index && (
                  <span
                    className="cwa_chat-history-delete-icon"
                    onClick={() => handleDelete(index)}
                  >
                    &#10005;
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatHistoryList;
