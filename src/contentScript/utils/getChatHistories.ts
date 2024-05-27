export const getChatHistories = async () => {
  try {
    const chatHistories =
      JSON.parse(localStorage.getItem("chatHistories")) || [];
    return chatHistories;
  } catch (error) {
    console.error("Error getting chat histories:", error);
    return [];
  }
};
