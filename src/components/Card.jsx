import React, { useState } from "react";
import {
  GithubIcon,
  DiscordIcon,
  UserIcon,
  TiktokIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
} from "./Icons";

export const Card = ({ item, index, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "user":
        return <UserIcon size={20} />;
      case "discord":
        return <DiscordIcon size={20} />;
      case "github":
        return <GithubIcon size={20} />;
      case "tiktok":
        return <TiktokIcon size={20} />;
      default:
        return <ExternalLinkIcon size={20} />;
    }
  };

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

  const handleCardClick = (e) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  return (
    <div
      className="link-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
    >
      <div className="card-icon-container">
        <div className="card-icon">{getIcon(item.type)}</div>
      </div>

      <div className="card-content">
        <h2 className="card-title">{item.title}</h2>
        {item.subtitle && <p className="card-subtitle">{item.subtitle}</p>}
      </div>

      <div className="card-actions">
        {item.copyValue && (
          <button
            type="button"
            className={`action-btn copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            title={`Copy ${item.copyValue}`}
            aria-label={`Copy ${item.copyValue}`}
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        )}

        {item.url && !item.copyValue && (
          <span className="action-btn arrow-btn" title="Open link">
            <ExternalLinkIcon size={16} />
          </span>
        )}
      </div>
    </div>
  );
};
