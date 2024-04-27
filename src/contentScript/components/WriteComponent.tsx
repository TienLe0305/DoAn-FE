import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import Select from "react-select";
import {
  IconType,
  IconEssay,
  IconBlogFacebook,
  IconEmail,
  IconIdeas,
  IconBlog,
  IconOutline,
  IconMarketing,
  IconComment,
  IconMessage,
  IconTwitter,
  IconTone,
  IconLength,
  IconLanguage,
} from "./SVG";
import { EventSourcePolyfill } from "event-source-polyfill";

const typeItems = [
  { icon: <IconEssay />, text: "Essay" },
  { icon: <IconBlogFacebook />, text: "Blog Facebook" },
  { icon: <IconEmail />, text: "Email" },
  { icon: <IconIdeas />, text: "Ideas" },
  { icon: <IconBlog />, text: "Blog" },
  { icon: <IconOutline />, text: "Outline" },
  { icon: <IconMarketing />, text: "Ads and Marketing" },
  { icon: <IconComment />, text: "Comment" },
  { icon: <IconMessage />, text: "Message" },
  { icon: <IconTwitter />, text: "Twitter" },
];

const toneItems = [
  { icon: "🙂", text: "Official" },
  { icon: "😉", text: "Normal" },
  { icon: "🧐", text: "Professional" },
  { icon: "🤩", text: "Enthusiastic" },
  { icon: "🤓", text: "Information" },
  { icon: "😄", text: "Humorous" },
];

const lengthItems = [
  { icon: "", text: "Short" },
  { icon: "", text: "Medium" },
  { icon: "", text: "Long" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "vi", label: "Vietnamese" },
];

function WriteComponent({ user }) {
  const [activeTab, setActiveTab] = useState("Composer");
  const [context, setContext] = useState({
    subject: "",
    type: "",
    tone: "",
    length: "",
    language: "",
  });
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  const handleTextareaBlur = (event) => {
    setContext((prevContext) => ({
      ...prevContext,
      subject: event.target.value,
    }));
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setContext((prevContext) => ({ ...prevContext, type }));
  };

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setContext((prevContext) => ({ ...prevContext, tone }));
  };

  const handleLengthSelect = (length) => {
    setSelectedLength(length);
    setContext((prevContext) => ({ ...prevContext, length }));
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setContext((prevContext) => ({ ...prevContext, language }));
  };

  const handleSend = () => {
    const formattedContext = `Hãy giúp tôi viết 1 đoạn composer với chủ đề ${context.subject} với loại văn bản ${context.type} với tone giọng ${context.tone} với độ dài ${context.length} bằng ngôn ngữ ${context.language}`;
    return formattedContext;
  };

  const getContextAnswer = async (formattedContext) => {
    setIsLoading(true);
    const eventSource = new EventSourcePolyfill(
      `http://127.0.0.1:8001/ext/chat?query=${encodeURIComponent(
        formattedContext
      )}&user_email=${encodeURIComponent(user.email)}`
    );

    let answer = "";
    eventSource.addEventListener("response", (event) => {
      const data = JSON.parse(event.data);

      for (let char of data.text) {
        answer += char;
        setResponse(answer);
        setIsLoading(false);
      }
    });

    eventSource.addEventListener("done", (event) => {
      eventSource.close();
    });
  };

  const sendContextAndAnswer = async () => {
    const formattedContext = handleSend();
    await getContextAnswer(formattedContext);
  };

  return (
    <div className="cwa_write-container">
      <div className="cwa_write-button-switch">
        <div
          className={`cwa_composer-button ${
            activeTab === "Composer" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Composer")}
        >
          Composer
        </div>
        <div
          className={`cwa_answer-button ${
            activeTab === "Answer" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Answer")}
        >
          Answer
        </div>
      </div>
      {activeTab === "Composer" && (
        <div className="cwa_composer-content">
          <textarea
            className="cwa_composer-textarea"
            placeholder="Subject that you want to write about..."
            value={textareaContent}
            onChange={handleTextareaChange}
            onBlur={handleTextareaBlur}
          ></textarea>
          <TypeComposerTypeItem
            title="Type"
            icon={<IconType />}
            items={typeItems}
            onSelect={handleTypeSelect}
          />
          <ToneComposerTypeItem
            title="Tone"
            icon={<IconTone />}
            items={toneItems}
            onSelect={handleToneSelect}
          />
          <LengthComposerTypeItem
            title="Length"
            icon={<IconLength />}
            items={lengthItems}
            onSelect={handleLengthSelect}
          />
          <ComposerLanguage
            icon={<IconLanguage />}
            options={languageOptions}
            onSelect={handleLanguageSelect}
          />
        </div>
      )}
      {activeTab === "Answer" && <div className="cwa_composer-answer"></div>}
      <button className="cwa_composer-send-btn" onClick={sendContextAndAnswer}>
        Send
      </button>
      <div className="cwa_write-answer">
        {isLoading ? "Thinking..." : response}
      </div>
    </div>
  );
}

function ToneComposerTypeItem({ title, icon, items, onSelect }) {
  const [activeItem, setActiveItem] = useState("");

  const handleSelect = (text) => {
    onSelect(text);
    setActiveItem(text);
  };

  return (
    <div className="cwa_composer-tone">
      <div className="cwa_composer-tone-title">
        {icon}
        <p>{title} :</p>
      </div>
      <div className="cwa_composer-tone-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`cwa_composer-tone-item ${item.text === activeItem ? "active" : ""}`}
            onClick={() => handleSelect(item.text)}
          >
            {typeof item === "string" ? item : item.icon} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function LengthComposerTypeItem({ title, icon, items, onSelect }) {
  const [activeItem, setActiveItem] = useState("");

  const handleSelect = (text) => {
    onSelect(text);
    setActiveItem(text);
  };
  return (
    <div className="cwa_composer-length">
      <div className="cwa_composer-length-title">
        {icon}
        <p>{title} :</p>
      </div>
      <div className="cwa_composer-length-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`cwa_composer-length-item ${item.text === activeItem ? "active" : ""}`}
            onClick={() => handleSelect(item.text)}
          >
            {typeof item === "string" ? item : item.icon} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeComposerTypeItem({ title, icon, items, onSelect }) {
  const [activeItem, setActiveItem] = useState("");

  const handleSelect = (text) => {
    onSelect(text);
    setActiveItem(text);
  };
  return (
    <div className="cwa_composer-type">
      <div className="cwa_composer-type-title">
        {icon}
        <p>{title} :</p>
      </div>
      <div className="cwa_composer-type-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`cwa_composer-type-item ${item.text === activeItem ? "active" : ""}`}
            onClick={() => handleSelect(item.text)}
          >
            {typeof item === "string" ? item : item.icon} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

const selectStyles = {
  control: (provided) => ({
    ...provided,
    padding: "10px !important",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: state.isSelected ? "solid 1px rgba(0, 0, 0, 1)" : null,
    padding: "10px !important",
  }),
};

function ComposerLanguage({ icon, options, onSelect }) {
  return (
    <div className="cwa_composer-language">
      <div className="cwa_composer-language-title">
        {icon}
        <p>Languages :</p>
      </div>
      <div className="cwa_composer-language-content">
        <div className="cwa_composer-language-select">
          <Select
            className="cwa_composer-language-select"
            options={options}
            styles={selectStyles}
            onChange={(option: { value: string; label: string }) =>
              onSelect(option.label)
            }
          />
        </div>
      </div>
    </div>
  );
}

WriteComponent.propTypes = {};

export default WriteComponent;
