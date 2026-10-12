import React, { useState } from "react";
import { SunIcon, MoonIcon, ShareIcon, VerifiedIcon } from "./Icons";

export const Header = ({ profile, theme, onToggleTheme, onShare }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="profile-header">
      <div className="header-controls">
        <button
          type="button"
          className="control-btn"
          onClick={onShare}
          aria-label="Share profile"
          title="Share profile"
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
        <div className="avatar-glow"></div>
        <div className="avatar-container">
          {!imgError ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="avatar-img"
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            <div className="avatar-fallback">{profile.avatarFallback}</div>
          )}
        </div>
        {profile.status?.online && (
          <div className="status-badge" title={profile.status.text || "Online"}>
            <span className="status-pulse"></span>
            <span className="status-dot"></span>
          </div>
        )}
      </div>

      <div className="profile-info">
        <div className="name-wrapper">
          <h1 className="profile-name">{profile.name}</h1>
          {profile.verified && (
            <span className="verified-badge" title="Verified Creator">
              <VerifiedIcon size={18} className="verified-icon" />
            </span>
          )}
        </div>

        {profile.tagline && <p className="profile-tagline">{profile.tagline}</p>}
        {profile.bio && <p className="profile-bio">{profile.bio}</p>}
      </div>
    </header>
  );
};
