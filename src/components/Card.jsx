import React, { useState } from "react";
import {
  GithubIcon,
  DiscordIcon,
  UserIcon,
  TiktokIcon,
  GlobeIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
} from "./Icons";

export const Card = ({ item, index, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "website":
        return <GlobeIcon size={18} />;
      case "user":
        return <UserIcon size={18} />;
      case "discord":
        return <DiscordIcon size={18} />;
      case "github":
        return <GithubIcon size={18} />;
      case "tiktok":
        return <TiktokIcon size={18} />;
      default:
        return <ExternalLinkIcon size={18} />;
    }
  };

  const renderIcon = () => {
    if (item.icon) {
      return (
        <img
          src={item.icon}
          alt={`${item.title} icon`}
          className={`pill-icon-img ${item.type === "github" ? "github-icon" : ""}`}
          loading="lazy"
        />
      );
    }
    return getIcon(item.type);
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

  const handleClick = (e) => {
    if (item.copyValue && !item.url) {
      handleCopy(e);
      return;
    }
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      className="pill-card"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${item.title}`}
    >
      <div className="pill-icon-wrapper">{renderIcon()}</div>

      <div className="pill-text-wrapper">
        <span className="pill-title">{item.title}</span>
        {item.subtitle && <span className="pill-subtitle">{item.subtitle}</span>}
      </div>

      <div className="pill-action-wrapper">
        {item.copyValue ? (
          <button
            type="button"
            className={`pill-action-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            title={`Copy ${item.copyValue}`}
            aria-label={`Copy ${item.copyValue}`}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </button>
        ) : (
          <span className="pill-action-icon">
            <ExternalLinkIcon size={14} />
          </span>
        )}
      </div>
    </div>
  );
};
