import React from "react";
import { SunIcon, MoonIcon, ShareIcon } from "./Icons";

export const Header = ({ profile, theme, onToggleTheme, onShare }) => {
  const isDark = theme === "dark";

  return (
    <div className="Header container">
      <div className="Header__inner">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="header-avatar"
          loading="eager"
        />
        <h2>{profile.name}</h2>
        {profile.verifiedBadge && (
          <img
            src={profile.verifiedBadge}
            alt="Verified"
            className="verified-badge-gif"
          />
        )}
      </div>

      <div className="Header__controls">
        <button
          type="button"
          className="share-button"
          onClick={onShare}
          aria-label="Share"
          title="Share"
        >
          <ShareIcon size={16} />
        </button>

        <button
          type="button"
          className="switch-theme-button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          title={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
          {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
      </div>
    </div>
  );
};
