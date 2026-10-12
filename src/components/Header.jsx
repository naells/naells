import React from "react";
import { SunIcon, MoonIcon, ShareIcon } from "./Icons";

export const Header = ({ profile, theme, onToggleTheme, onShare }) => {
  return (
    <header className="profile-header">
      <div className="header-controls">
        <button
          type="button"
          className="control-btn"
          onClick={onShare}
          aria-label="Share profile"
          title="Share"
        >
          <ShareIcon size={18} />
        </button>

        <button
          type="button"
          className="control-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
      </div>

      <div className="avatar-wrapper">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="avatar-img"
          loading="eager"
        />
      </div>

      <h1 className="profile-name">{profile.name}</h1>
    </header>
  );
};
