import React from "react";
import { CheckIcon } from "./Icons";

export const Toast = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast">
        <span className="toast-icon">
          <CheckIcon size={16} />
        </span>
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
};
