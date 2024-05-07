import React, { useState } from "react";
import Select from "react-select";
import { EventSourcePolyfill } from "event-source-polyfill";
import { LoadingMessageIcon } from "./SVG";

// Styles for Select components
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderRadius: "5px",
    background: "#FFF",
    padding: "10px !important",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: state.isSelected ? "solid 1px rgba(0, 0, 0, 0.1)" : null,
    padding: "10px !important",
    color: "black",
    backgroundColor: state.isSelected ? "#E8EDE7" : null,
  }),
};

const optionStyles = {
  control: (provided, state) => ({
    ...selectStyles.control(provided, state),
    width: "300px",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: state.isSelected ? "solid 1px rgba(0, 0, 0, 0.1)" : null,
    padding: "10px !important",
    color: "black",
    backgroundColor: state.isSelected ? "#E8EDE7" : null,
  }),
};

const languageOptionStyles = {
  control: (provided, state) => ({
    ...selectStyles.control(provided, state),
    width: "120px",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: state.isSelected ? "solid 1px rgba(0, 0, 0, 0.1)" : null,
    padding: "10px !important",
    color: "black",
    backgroundColor: state.isSelected ? "#E8EDE7" : null,
  }),
};

// Options for Select components
const taskOptions = [
  { value: "answer", label: "Trả lời câu hỏi này" },
  { value: "explain", label: "Giải thích điều này" },
  { value: "translate", label: "Dịch" },
  { value: "summarize", label: "Tóm tắt" },
  { value: "improve", label: "Cải thiện kỹ năng viết" },
  { value: "correct", label: "Sửa chính tả và ngữ pháp" },
  { value: "shorten", label: "Rút ngắn" },
  { value: "lengthen", label: "Làm dài hơn" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "vi", label: "Vietnamese" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "ru", label: "Russian" },
  { value: "jp", label: "Japanese" },
  { value: "cn", label: "Chinese" },
];

function QuestionComponent({ user }) {
  const [selectedTask, setSelectedTask] = useState(taskOptions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [promptText, setPromptText] = useState(
    'Your task as an AI is to generate a response in ${lang} language to the following question: """${selection}""". Ensure your response is clear and accurate, and present it without wrapping in quotes.'
  );
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);

  const handleTaskChange = (option) => {
    setSelectedTask(option);
    setShowLanguageSelect(
      option.value === "answer" ||
        option.value === "explain" ||
        option.value === "translate"
    );

    switch (option.value) {
      case "answer":
        setPromptText(
          'Your task as an AI is to generate a response in ${lang} language to the following question: """${selection}""". Ensure your response is clear and accurate, and present it without wrapping in quotes.'
        );
        break;
      case "explain":
        setPromptText('Please explain in ${lang}: "${selection}"');
        break;
      case "translate":
        setPromptText(
          'As an AI language translation expert, your task is to translate the provided text into ${lang} language. Your goal is to deliver a colloquial and authentic translation. Please provide only the output without any additional information or quotes. """""" ${selection} """""""'
        );
        break;
      case "summarize":
        setPromptText(
          'As a proficient AI, specialized in language comprehension and writing enhancement, your task is to review the text within the triple quotes and improve it while maintaining its original essence. Strive to keep the original meaning, structure, character length and format intact to ensure coherence and readability. Provide only the improved version of the text without wrapping responses in quotes or changing the language of the text. """"""${selection}"""""""'
        );
        break;
      case "improve":
        setPromptText(
          'As an AI trained in concise writing, your task is to condense the text within the triple quotes. Make sure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text."""${selection}"""'
        );
        break;
      case "correct":
        setPromptText(
          'As an AI trained in language correction, your task is to scrutinize the text encased within the triple quotes and rectify any spelling, syntax, or grammar errors without altering its original meaning or style. Your corrections should solely focus on spelling, syntax, and grammar mistakes without making any enhancements. Should the original text be error-free, output it as it is without encasing responses in quotes.""""""${selection}"""""""'
        );
        break;
      case "shorten":
        setPromptText(
          'As an AI trained in concise writing, your task is to condense the text within the triple quotes. Make sure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text."""${selection}"""'
        );
        break;
      case "lengthen":
        setPromptText(
          'As an AI adept in the art of elaborative writing, your task is to rewrite the text enclosed within the triple quotes. Ensure that the revised text is more than double the length of the original, whilst maintaining its original meaning. Deliver only the output without any extra information or quotes. Your response should mirror the language variety or dialect used in this given text. """""" ${selection} """""""'
        );
        break;
      default:
        break;
    }
  };

  const handleLanguageChange = (option) => {
    setSelectedLanguage(option);
  };

  const getContextAnswer = async () => {
    setIsLoading(true);
    setOutputText("");

    const selection = inputText;
    const lang = selectedLanguage.value;
    const prompt = promptText
      .replace("${selection}", selection)
      .replace("${lang}", lang);

    const eventSource = new EventSourcePolyfill(
      `http://127.0.0.1:8002/ext/chat?query=${encodeURIComponent(
        prompt
      )}&user_email=${encodeURIComponent(user.email)}`
    );

    let answer = "";
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);

      for (const char of data.text) {
        answer += char;
        setOutputText(answer);
      }
    });

    eventSource.addEventListener("done", () => {
      eventSource.close();
      setIsLoading(false);
    });
  };

  const handleSubmit = async () => {
    await getContextAnswer();
  };

  const optionStyle = showLanguageSelect
    ? optionStyles
    : {
        ...optionStyles,
        control: (provided, state) => ({
          ...provided,
          width: "420px",
          padding: "10px !important",
        }),
      };

  return (
    <div className="cwa_question-component-container">
      <div className="cwa_question-component-option">
        <Select
          defaultValue={taskOptions[0]}
          options={taskOptions}
          styles={optionStyle}
          isSearchable={false}
          onChange={handleTaskChange}
        />
        {showLanguageSelect && (
          <Select
            defaultValue={languageOptions[0]}
            options={languageOptions}
            styles={languageOptionStyles}
            isSearchable={false}
            onChange={handleLanguageChange}
          />
        )}
      </div>
      <textarea
        name="prompt"
        className="cwa_question-component-prompt"
        value={promptText}
        readOnly
      ></textarea>

      <textarea
        name="content"
        className="cwa_question-component-content"
        placeholder="Dán hoặc nhập nội dung câu hỏi vào đây... Nhấn Shift + Enter để bắt đầu 1 dòng mới và Enter để gửi câu hỏi."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <div className="cwa_question-component-submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div
        className="cwa_question-component-result"
        style={{ display: isLoading || outputText ? "block" : "none" }}
      >
        {isLoading ? <LoadingMessageIcon /> : outputText}
      </div>
    </div>
  );
}

export default QuestionComponent;
