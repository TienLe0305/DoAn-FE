import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  BinIcon,
  CheckIcon,
  ClosesIcon,
  CopyColorIcon,
  CopyIcon,
  ExpandIcon,
  ExplainIcon,
  GrammarIcon,
  HighlightIcon,
  LoadingMessageIcon,
  LogoIcon,
  LogoIconForTools,
  MoveToHiddenIcon,
  RewriteIcon,
  SearchIcon,
  SummarizeIcon,
  TranslateIcon,
} from "./SVG";
import ReactMarkdown from "react-markdown";
import languageOptions from "../utils/languages";

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;

const ToolsComponent = ({ user }) => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [currentFeature, setCurrentFeature] = useState("");
  const [highlightPopup, setHighlightPopup] = useState({
    visible: false,
    position: { top: 0, left: 0 },
  });
  const [highlightColor, setHighlightColor] = useState(
    "rgb(250, 255, 10, 0.24)"
  );
  const [savedRange, setSavedRange] = useState(null);
  const [summaryPopup, setSummaryPopup] = useState({
    visible: false,
    position: { top: 0, left: 0 },
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const summaryPopupRef = useRef(null);
  const toolsPopupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [isInteractingWithPopup, setIsInteractingWithPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [highlights, setHighlights] = useState([]);
  const [isHighlightListVisible, setIsHighlightListVisible] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const filteredLanguages = languageOptions.filter((language) =>
    language.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && summaryPopupRef.current) {
        const newLeft = e.clientX - dragOffset.x;
        const newTop = e.clientY - dragOffset.y;
        summaryPopupRef.current.style.left = `${newLeft}px`;
        summaryPopupRef.current.style.top = `${newTop}px`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    const handleMouseUp = async (event) => {
      if (isInteractingWithPopup) {
        return;
      }

      const selected = window.getSelection().toString();
      if (selected && !summaryPopup.visible) {
        setSelectedText(selected);
        setSavedRange(window.getSelection().getRangeAt(0));
        setPopupPosition({
          top: event.clientY + window.scrollY,
          left: event.clientX + window.scrollX,
        });
      } else if (!summaryPopup.visible) {
        setSelectedText("");
      }
    };

    const handleClickOutside = (event) => {
      if (
        toolsPopupRef.current &&
        !toolsPopupRef.current.contains(event.target) &&
        summaryPopupRef.current &&
        !summaryPopupRef.current.contains(event.target) &&
        !(
          showLanguageSelect &&
          event.target.closest(".cwa_language-select-tooltip")
        )
      ) {
        setSelectedText("");
        setShowLanguageSelect(false);
        setSummaryPopup({ visible: false, position: { top: 0, left: 0 } });
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [summaryPopup.visible, isInteractingWithPopup, showLanguageSelect]);

  const highlightText = (color) => {
    if (!savedRange) return;
    const highlightedSpans = [];
    let highlightedText = "";

    const range = savedRange.cloneRange();
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    const wrapTextNodes = (node, color) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
        const span = document.createElement("span");
        span.style.backgroundColor = color;
        span.dataset.highlightId = Date.now().toString();
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
        highlightedSpans.push(span);
        highlightedText += node.nodeValue + " ";
      }
    };

    if (startContainer.nodeType === Node.TEXT_NODE) {
      const text = startContainer.nodeValue;
      const selectedText = text.substring(range.startOffset);
      const beforeText = text.substring(0, range.startOffset);
      startContainer.nodeValue = beforeText;
      const selectedNode = document.createTextNode(selectedText);
      startContainer.parentNode.insertBefore(
        selectedNode,
        startContainer.nextSibling
      );
      wrapTextNodes(selectedNode, color);
    }

    if (endContainer.nodeType === Node.TEXT_NODE) {
      const text = endContainer.nodeValue;
      const selectedText = text.substring(0, range.endOffset);
      const afterText = text.substring(range.endOffset);
      endContainer.nodeValue = afterText;
      const selectedNode = document.createTextNode(selectedText);
      endContainer.parentNode.insertBefore(selectedNode, endContainer);
      wrapTextNodes(selectedNode, color);
    }

    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (range.intersectsNode(node) && node.nodeValue.trim() !== "") {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        },
      }
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
      if (currentNode !== startContainer && currentNode !== endContainer) {
        wrapTextNodes(currentNode, color);
      }
      currentNode = walker.nextNode();
    }

    setHighlights((prevHighlights) => [
      ...prevHighlights,
      {
        id: Date.now().toString(),
        spans: highlightedSpans,
        color,
        text: highlightedText.trim(),
      },
    ]);
    setIsHighlightListVisible(true);
    setSelectedText("");
    setIsInteractingWithPopup(false);
    setSavedRange(null);
  };

  const removeHighlight = (highlightId) => {
    const highlightToRemove = highlights.find((h) => h.id === highlightId);
    if (highlightToRemove) {
      highlightToRemove.spans.forEach((span) => {
        const parent = span.parentNode;
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      });
      setHighlights((prevHighlights) =>
        prevHighlights.filter((h) => h.id !== highlightId)
      );
    }
  };

  const toggleHighlightList = () => {
    setIsHighlightListVisible(!isHighlightListVisible);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "i") {
        event.preventDefault();
        setIsHighlightListVisible(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const HighlightList = ({
    highlights,
    removeHighlight,
    isVisible,
    onToggle,
  }) => {
    const [copiedId, setCopiedId] = useState(null);
    if (highlights.length === 0) return null;

    return (
      <div className={`cwa_highlight-list ${isVisible ? "" : "hidden"}`}>
        <div className="cwa_highlight-header">
          <h3>Highlight List</h3>
          <button className="cwa_toggle-button" onClick={onToggle}>
            <MoveToHiddenIcon />
          </button>
        </div>
        {highlights.map((highlight) => (
          <div key={highlight.id} className="cwa_highlight-item">
            <span
              className="cwa_highlight-color"
              style={{ backgroundColor: highlight.color }}
            ></span>
            <span
              className="cwa_highlight-text"
              title={highlight.text}
              data-tooltip={highlight.text}
            >
              {highlight.text}
            </span>
            <button
              onClick={() => copyToClipboard(highlight.text, highlight.id)}
            >
              {copiedId === highlight.id ? <CheckIcon /> : <CopyColorIcon />}
            </button>
            <button onClick={() => removeHighlight(highlight.id)}>
              <BinIcon />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleSummarizeClick = async (event) => {
    setCurrentFeature("Summarize");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "Summarize");
    }
  };

  const handleRewriteClick = async (event) => {
    setCurrentFeature("Rewrite");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "Rewrite");
    }
  };

  const handleExpandClick = async (event) => {
    setCurrentFeature("Expand");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "Expand");
    }
  };

  const handleExplainClick = async (event) => {
    setCurrentFeature("Explain");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "Explain");
    }
  };

  const handleGrammarCheckClick = async (event) => {
    setCurrentFeature("GrammarCheck");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "GrammarCheck");
    }
  };

  const handleHighlightClick = (event) => {
    setCurrentFeature("Highlight");
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setHighlightPopup({
      visible: true,
      position: { top: buttonRect.height + 5, left: 0 },
    });
  };

  const handleTranslateClick = (event) => {
    setCurrentFeature("Translate");
    setShowLanguageSelect((prevState) => !prevState);
  };

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelect(false);

    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.left,
        },
      });
      await getContextAnswer(selectedText, "Translate", language);
    }
  };

  const handleDragStart = (e) => {
    if (summaryPopupRef.current) {
      const rect = summaryPopupRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleColorSelect = (color) => {
    highlightText(color);
    setHighlightColor(color);
    setHighlightPopup({ visible: false, position: { top: 0, left: 0 } });
  };

  const renderToolButton = (icon, tooltipText) => (
    <div
      className={`cwa_${tooltipText.toLowerCase()}-container`}
      style={{ position: "relative" }}
    >
      <button
        className={`cwa_${tooltipText.toLowerCase()}-button`}
        onClick={
          tooltipText === "Highlight"
            ? handleHighlightClick
            : tooltipText === "Summarize"
              ? handleSummarizeClick
              : tooltipText === "Translate"
                ? handleTranslateClick
                : tooltipText === "Rewrite"
                  ? handleRewriteClick
                  : tooltipText === "Expand"
                    ? handleExpandClick
                    : tooltipText === "Explain"
                      ? handleExplainClick
                      : tooltipText === "GrammarCheck"
                        ? handleGrammarCheckClick
                        : undefined
        }
      >
        {icon}
        {tooltipText === "Highlight" && (
          <div
            className="cwa_mark-color"
            style={{ backgroundColor: highlightColor }}
          ></div>
        )}
        {tooltipText === "Translate" && showLanguageSelect && (
          <div className="cwa_language-select-tooltip">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="input-icon">
              <SearchIcon />
            </span>
            <div>
              {filteredLanguages.map((language) => (
                <button
                  key={language.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLanguageSelect(language.label);
                  }}
                >
                  {language.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </button>
      <div className="cwa_tooltip-web">{tooltipText}</div>
    </div>
  );

  const renderColorOption = (color) => (
    <div
      onClick={() => handleColorSelect(color)}
      className="cwa_color-option"
      style={{
        backgroundColor: color,
      }}
    ></div>
  );

  const getContextAnswer = async (selection, tool, targetLanguage = "en") => {
    setIsLoading(true);
    setOutputText("");
    let prompt = "";
    let temperature = 0.7;
    switch (tool) {
      case "Summarize":
        prompt = `As an AI trained in concise writing, your task is to condense the text within the quotes. Ensure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text: '${selection}'`;
        temperature = 0.4;
        break;
      case "Translate":
        prompt = `As an AI language translation expert, your task is to translate the provided text as '${selection}' into ${targetLanguage}. Your goal is to deliver a colloquial and authentic translation. Please provide only the output without any additional information or quotes.`;
        temperature = 0.3;
        break;
      case "Rewrite":
        prompt = `As a proficient AI specialized in language comprehension and writing enhancement, your task is to review the text within the quotes and improve it while maintaining its original essence. Strive to keep the original meaning, structure, character length, and format intact to ensure coherence and readability. Provide only the improved version of the text without wrapping responses in quotes or changing the language of the text: '${selection}'`;
        temperature = 0.6;
        break;
      case "Expand":
        prompt = `As an AI adept in the art of elaborative writing, your task is to rewrite the text enclosed within the quotes. Ensure that the revised text is more than double the length of the original while maintaining its original meaning. Deliver only the output without any extra information or quotes. Your response should mirror the language variety or dialect used in the given text: '${selection}'`;
        temperature = 0.8;
        break;
      case "Explain":
        prompt =
          "As an AI expert in simplification, explain the text within quotes in an easily understandable way. Ensure the explanation is clear and concise while retaining the original meaning. Present only the output without additional information or quotation marks. Use the same language as the original text:\n'" +
          selection +
          "'\n";
        temperature = 0.5;
        break;
      case "GrammarCheck":
        prompt = `As an AI trained in language correction, your task is to scrutinize the text within the quotes and rectify any spelling, syntax, or grammar errors without altering its original meaning or style. Your corrections should focus solely on spelling, syntax, and grammar mistakes without making any enhancements. If the original text is error-free, output it as it is without encasing responses in quotes: '${selection}'`;
        temperature = 0.2;
        break;
      default:
        prompt = "";
    }

    const eventSource = new EventSourcePolyfill(
      `${CWA}/${CHAT}?query=${encodeURIComponent(
        `\`\`\`${selection}\`\`\``
      )}&user_email=${encodeURIComponent(
        user.email
      )}&prompt=${encodeURIComponent(prompt)}&temperature=${temperature}`
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
      setShowLanguageSelect(false);
      setIsInteractingWithPopup(false);
    });
  };

  return (
    <>
      <HighlightList
        highlights={highlights}
        removeHighlight={removeHighlight}
        isVisible={isHighlightListVisible}
        onToggle={toggleHighlightList}
      />
      <div
        ref={toolsPopupRef}
        className={`cwa_tools-popup ${selectedText ? "flex" : "none"}`}
        style={{
          top: `${popupPosition.top}px`,
          left: `${popupPosition.left}px`,
        }}
        onMouseEnter={() => setIsInteractingWithPopup(true)}
        onMouseLeave={() => setIsInteractingWithPopup(false)}
      >
        {renderToolButton(<HighlightIcon />, "Highlight")}
        {renderToolButton(<SummarizeIcon />, "Summarize")}
        {renderToolButton(<TranslateIcon />, "Translate")}
        {renderToolButton(<RewriteIcon />, "Rewrite")}
        {renderToolButton(<ExpandIcon />, "Expand")}
        {renderToolButton(<ExplainIcon />, "Explain")}
        {renderToolButton(<GrammarIcon />, "GrammarCheck")}
        {renderToolButton(<LogoIconForTools />, "Quick")}
        {highlightPopup.visible && (
          <div
            className="cwa_highlight-popup"
            style={{ left: `${highlightPopup.position.left}px` }}
          >
            <div className="cwa_highlight-container">
              <div className="cwa_color-options">
                {renderColorOption("rgba(250, 255, 10)")}
                {renderColorOption("rgba(255, 0, 0)")}
                {renderColorOption("rgba(0, 255, 0)")}
                {renderColorOption("rgba(0, 0, 255)")}
              </div>
            </div>
          </div>
        )}
      </div>
      {summaryPopup.visible && (
        <>
          <div className="cwa_summary-overlay" />
          <div
            ref={summaryPopupRef}
            className={`cwa_summary-popup ${isDragging ? "grabbing" : "grab"}`}
            style={{
              top: `${summaryPopup.position.top}px`,
              left: `${summaryPopup.position.left}px`,
            }}
            onMouseEnter={() => setIsInteractingWithPopup(true)}
            onMouseLeave={() => setIsInteractingWithPopup(false)}
          >
            <div
              onMouseDown={handleDragStart}
              className={`cwa_summary-header ${
                isDragging ? "grabbing" : "grab"
              }`}
            >
              {" "}
              <div className="cwa_summary-header-container">
                <LogoIcon />
                <h4>{currentFeature}</h4>
              </div>
              <button
                onClick={() => {
                  setSummaryPopup({
                    visible: false,
                    position: { top: 0, left: 0 },
                  });
                }}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                <ClosesIcon />
              </button>
            </div>
            <div className="cwa_summary-content">
              <div
                className={`cwa_selected-text ${
                  isExpanded ? "expanded" : "less"
                }`}
              >
                {selectedText}
                <div>
                  <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
              <div
                style={{ display: isLoading || outputText ? "block" : "none" }}
              >
                {(isLoading && outputText) || outputText ? (
                  <ReactMarkdown className="cwa_output-text">
                    {outputText}
                  </ReactMarkdown>
                ) : (
                  <p className="cwa_loading-text">
                    <LoadingMessageIcon />
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ToolsComponent;
