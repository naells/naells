import React from "react";
import { ShareIcon } from "./Icons";

export const Header = ({ profile, onShare }) => {
  return (
    <header className="profile-header">
      <div className="header-top-bar">
        <button
          type="button"
          className="header-icon-btn"
          onClick={onShare}
          aria-label="Share profile"
          title="Share"
        >
          <ShareIcon size={18} />
        </button>
      </div>

      <div className="avatar-wrapper">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="header-avatar"
          loading="eager"
        />
      </div>

      <div className="profile-title-container">
        <div className="profile-title-row">
          <h1 className="profile-name">{profile.name}</h1>
          {profile.verifiedBadge && (
            <img
              src={profile.verifiedBadge}
              alt="Verified"
              className="verified-badge-gif"
            />
          )}
        </div>
        {profile.username && (
          <p className="profile-username">{profile.username}</p>
        )}
      </div>
    </header>
  );
};
