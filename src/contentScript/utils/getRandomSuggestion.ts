export const getRandomSuggestions = (suggestions, count) => {
  const shuffledSuggestions = suggestions.sort(() => 0.5 - Math.random());
  return shuffledSuggestions.slice(0, count);
};
