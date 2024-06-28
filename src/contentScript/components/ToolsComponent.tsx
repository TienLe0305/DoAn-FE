import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  ClosesIcon,
  ExpandIcon,
  ExplainIcon,
  GrammarIcon,
  HighlightIcon,
  LogoIconForTools,
  MoreToolsIcon,
  RewriteIcon,
  SummarizeIcon,
  TranslateIcon,
} from "./SVG";

const CHAT = process.env.API_CHAT;
const CWA = process.env.API_DOMAIN;

const ToolsComponent = ({ user }) => {
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
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [summaryPopup.visible]);

  const highlightText = (color) => {
    if (!savedRange) return;

    const range = savedRange.cloneRange();
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    const wrapTextNodes = (node, color) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
        const span = document.createElement("span");
        span.style.backgroundColor = color;
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
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

    setSelectedText("");
    setSavedRange(null);
  };

  const handleSummarizeClick = async (event) => {
    setCurrentFeature("Summarize");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.right + 10,
        },
      });
      await getContextAnswer(selectedText, "Summarize");
    }
  };

  const handleTranslateClick = async (event) => {
    setCurrentFeature("Translate");
    if (toolsPopupRef.current) {
      const toolsRect = toolsPopupRef.current.getBoundingClientRect();
      setSummaryPopup({
        visible: true,
        position: {
          top: toolsRect.top,
          left: toolsRect.right + 10,
        },
      });
      await getContextAnswer(selectedText, "Translate");
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
          left: toolsRect.right + 10,
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
          left: toolsRect.right + 10,
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
          left: toolsRect.right + 10,
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
          left: toolsRect.right + 10,
        },
      });
      await getContextAnswer(selectedText, "GrammarCheck");
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

  const handleHighlightClick = (event) => {
    setCurrentFeature("Highlight");
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setHighlightPopup({
      visible: true,
      position: { top: buttonRect.height + 5, left: 0 },
    });
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

  const getContextAnswer = async (selection, tool) => {
    setIsLoading(true);
    setOutputText("");

    let prompt = "";

    switch (tool) {
      case "Summarize":
        prompt =
          "As an AI trained in concise writing, your task is to condense the text within the quotes. Ensure the revised text is no more than half the length of the original while retaining its meaning. Present only the output without any additional information or wrapping it in quotes. Your response should be in the same language variety or dialect as that of the given text: \n'" +
          selection +
          "'\n";
        break;
      case "Translate":
        prompt =
          "As an AI proficient in multiple languages, translate the text within the quotes to English. Your response should be accurate and contextually appropriate, retaining the original meaning. Present only the output without any additional information or wrapping it in quotes: \n'" +
          selection +
          "'\n";
        break;
      case "Rewrite":
        prompt =
          "As an AI skilled in language refinement, rewrite the text within the quotes to improve clarity, style, and coherence. Ensure the revised text maintains the original meaning. Present only the output without any additional information or wrapping it in quotes: \n'" +
          selection +
          "'\n";
        break;
      case "Expand":
        prompt =
          "As an AI proficient in elaboration, expand the text within the quotes to provide more detail and context. Ensure the expanded text remains relevant and accurate. Present only the output without any additional information or wrapping it in quotes: \n'" +
          selection +
          "'\n";
        break;
      case "Explain":
        prompt =
          "As an AI skilled in simplification, explain the text within the quotes in a way that is easy to understand. Ensure the explanation is clear and concise, retaining the original meaning. Present only the output without any additional information or wrapping it in quotes: \n'" +
          selection +
          "'\n";
        break;
      case "GrammarCheck":
        prompt =
          "As an AI proficient in grammar, check and correct any grammatical errors in the text within the quotes. Ensure the corrected text maintains the original meaning. Present only the output without any additional information or wrapping it in quotes: \n'" +
          selection +
          "'\n";
        break;
      default:
        prompt = "";
    }

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
      console.log(data.text);

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

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        ref={toolsPopupRef}
        className={`cwa_tools-popup ${selectedText ? "flex" : "none"}`}
        style={{
          top: `${popupPosition.top}px`,
          left: `${popupPosition.left}px`,
        }}
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
            <div className="cwa_color-options">
              {renderColorOption("rgba(250, 255, 10)")}
              {renderColorOption("rgba(255, 0, 0)")}
              {renderColorOption("rgba(0, 255, 0)")}
              {renderColorOption("rgba(0, 0, 255)")}
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
          >
            <div
              onMouseDown={handleDragStart}
              className={`cwa_summary-header ${
                isDragging ? "grabbing" : "grab"
              }`}
            >
              <h4>{currentFeature}</h4>
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
              <div>
                {isLoading ? (
                  <p className="cwa_loading-text">Loading...</p>
                ) : (
                  <p className="cwa_output-text">{outputText}</p>
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
