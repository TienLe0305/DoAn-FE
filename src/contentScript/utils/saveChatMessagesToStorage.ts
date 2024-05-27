export const saveChatMessagesToStorage = (messages, chatHistoryId, setChatHistoryId) => {
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
      let chatHistories = JSON.parse(localStorage.getItem('chatHistories')) || [];
      const existingChatHistoryIndex = chatHistories.findIndex(
        (chatHistory) => chatHistory.key === chatHistoryId
      );
      if (existingChatHistoryIndex !== -1) {
        chatHistories[existingChatHistoryIndex] = newChatHistory;
      } else {
        chatHistories.push(newChatHistory);
        setChatHistoryId(timestamp);
      }
      localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
    } catch (error) {
      console.error('Error saving chat messages to storage:', error);
    }
  };