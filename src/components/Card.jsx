import React, { useState } from "react";
import { CopyIcon, CheckIcon, ExternalLinkIcon } from "./Icons";

export const Card = ({ item, index, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.copyValue) {
      navigator.clipboard.writeText(item.copyValue);
      setCopied(true);
      if (onCopy) onCopy(item.copyValue);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="Card"
      style={{ animationDelay: `${index * 0.09}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Visit ${item.title}`}
    >
      <div className="cover-wrapper">
        <img
          src={item.cover}
          className={`cover cover-${item.coverFit || "cover"}`}
          alt={`${item.title} cover`}
          loading="lazy"
        />
      </div>

      <div className="data">
        <div className="data-row">
          <h2>{item.title}</h2>

          {item.copyValue ? (
            <button
              type="button"
              className={`card-copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title={`Copy ${item.copyValue}`}
              aria-label={`Copy ${item.copyValue}`}
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            </button>
          ) : (
            <span className="card-external-icon">
              <ExternalLinkIcon size={14} />
            </span>
          )}
        </div>
        <p>{item.subtitle}</p>
      </div>
    </div>
  );
};
