import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { EventSourcePolyfill } from "event-source-polyfill";
import { CopyIcon, LoadingMessageIcon } from "./SVG";
import ReactMarkdown from "react-markdown";
import languageOptions from "../utils/languages";
import { useTranslation } from "react-i18next";

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;

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
    width: "280px",
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
    width: "130px",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: state.isSelected ? "solid 1px rgba(0, 0, 0, 0.1)" : null,
    padding: "10px !important",
    color: "black",
    backgroundColor: state.isSelected ? "#E8EDE7" : null,
  }),
};

function QuestionComponent({ user }) {
  const { t, i18n } = useTranslation();
  const taskOptions = [
    { value: "answer", label: t("Answer this question") },
    { value: "explain", label: t("Explain this") },
    { value: "translate", label: t("Translate") },
    { value: "summarize", label: t("Summarize") },
    { value: "improve", label: t("Improve writing skills") },
    { value: "correct", label: t("Correct spelling and grammar") },
    { value: "shorten", label: t("Shorten") },
    { value: "lengthen", label: t("Lengthen") },
  ];
  const [language, setLanguage] = useState();
  const [selectedTask, setSelectedTask] = useState(taskOptions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [promptText, setPromptText] = useState(
    'Your task as an AI is to generate a response in ${lang} language to the following question: """${selection}""". Ensure your response is clear and accurate, and present it without wrapping in quotes.'
  );
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);
  const [copied, setCopied] = useState(false);

  const responseRef = useRef(null);

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
    responseRef.current?.scrollIntoView({ behavior: "instant" });
  }, [outputText]);

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
          "Your task as an AI is to generate a response in ${lang} to the following question: '${selection}'. Ensure your response is clear and accurate, and present it without wrapping in quotes."
        );
        break;
      case "explain":
        setPromptText("Please explain in ${lang}: '${selection}'");
        break;
      case "translate":
        setPromptText(
          "As an AI language translation expert, your task is to translate the provided text as '${selection}' into ${lang}. Your goal is to deliver a colloquial and authentic translation. Please provide only the output without any additional information or quotes."
        );
        break;
      case "summarize":
        setPromptText(
          "As an AI trained in concise writing, your task is to condense the text within the quotes. Ensure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text: '${selection}'"
        );
        break;
      case "improve":
        setPromptText(
          "As a proficient AI specialized in language comprehension and writing enhancement, your task is to review the text within the quotes and improve it while maintaining its original essence. Strive to keep the original meaning, structure, character length, and format intact to ensure coherence and readability. Provide only the improved version of the text without wrapping responses in quotes or changing the language of the text: '${selection}'"
        );
        break;
      case "correct":
        setPromptText(
          "As an AI trained in language correction, your task is to scrutinize the text within the quotes and rectify any spelling, syntax, or grammar errors without altering its original meaning or style. Your corrections should focus solely on spelling, syntax, and grammar mistakes without making any enhancements. If the original text is error-free, output it as it is without encasing responses in quotes: '${selection}'"
        );
        break;
      case "shorten":
        setPromptText(
          "As an AI trained in concise writing, your task is to condense the text within the quotes. Ensure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text: '${selection}'"
        );
        break;
      case "lengthen":
        setPromptText(
          "As an AI adept in the art of elaborative writing, your task is to rewrite the text enclosed within the quotes. Ensure that the revised text is more than double the length of the original while maintaining its original meaning. Deliver only the output without any extra information or quotes. Your response should mirror the language variety or dialect used in the given text: '${selection}'"
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
    console.log(selection, "selection");

    const lang = selectedLanguage.label;
    const prompt = promptText
      .replace("${lang}", lang)
      .replace("${selection}", selection);
    console.log(prompt, "prompt");

    const eventSource = new EventSourcePolyfill(
      `${CWA}/${CHAT}?query=${encodeURIComponent(
        `\`\`\`${selection}\`\`\``
      )}&user_email=${encodeURIComponent(
        user.email
      )}&prompt=${encodeURIComponent(prompt)}`
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

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const optionStyle = showLanguageSelect
    ? optionStyles
    : {
        ...optionStyles,
        control: (provided, state) => ({
          ...provided,
          width: "400px",
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
        placeholder={t("enter-text-here")}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <div className="cwa_question-component-submit">
        <button onClick={handleSubmit}>{t("submit")}</button>
      </div>
      <div
        className="cwa_question-component-result"
        style={{ display: isLoading || outputText ? "block" : "none" }}
      >
        {(isLoading && outputText) || outputText ? (
          <ReactMarkdown>{outputText}</ReactMarkdown>
        ) : (
          <LoadingMessageIcon />
        )}
        {!isLoading && outputText && (
          <div
            className="cwa_copy-message"
            onClick={() => handleCopyMessage(outputText)}
          >
            <CopyIcon />
            <span className="cwa_tooltip">{copied ? "Copied!" : "Copy"}</span>
          </div>
        )}
      </div>
      <div ref={responseRef}></div>
    </div>
  );
}

export default QuestionComponent;
