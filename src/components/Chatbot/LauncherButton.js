import React from "react";
import "./LauncherButton.css";

const LauncherButton = ({ onClick }) => {
  return (
    <button className="launcher-button" onClick={onClick}>
      <span role="img" aria-label="chat">😊</span>
    </button>
  );
};

export default LauncherButton;
