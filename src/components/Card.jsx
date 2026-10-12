import React, { useState } from "react";
import {
  GithubIcon,
  DiscordIcon,
  DiscordServerIcon,
  TiktokIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
} from "./Icons";

export const Card = ({ item, index, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "github":
        return <GithubIcon size={24} className="icon-github" />;
      case "discord":
        return <DiscordIcon size={24} className="icon-discord" />;
      case "discord-server":
        return <DiscordServerIcon size={24} className="icon-discord-server" />;
      case "tiktok":
        return <TiktokIcon size={24} className="icon-tiktok" />;
      default:
        return <ExternalLinkIcon size={24} />;
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
    // If it's pure copy action (or user clicked a card with copyValue)
    if (item.copyValue && !item.url) {
      handleCopy(e);
      return;
    }
    // If it has a url, open in new tab
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
      className={`link-card card-${item.type} ${item.featured ? "featured" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
    >
      <div className="card-shine"></div>

      <div className="card-icon-container">
        <div className="card-icon-bg">{getIcon(item.type)}</div>
      </div>

      <div className="card-content">
        <div className="card-title-row">
          <h2 className="card-title">{item.title}</h2>
          {item.featured && <span className="featured-pill">Featured</span>}
        </div>
        <p className="card-subtitle">{item.subtitle}</p>
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
            <span className="btn-label">{copied ? "Copied" : item.badge || "Copy"}</span>
          </button>
        )}

        {item.url && !item.copyValue && (
          <span className="action-btn arrow-btn" title="Open link">
            <span className="btn-label">{item.badge}</span>
            <ExternalLinkIcon size={16} />
          </span>
        )}
      </div>
    </div>
  );
};
