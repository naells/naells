import React, { useState, useEffect } from "react";
import { profileConfig } from "./links.config";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("naell-theme");
    return saved ? saved : "dark";
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("naell-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleCopy = (value) => {
    showToast(`Copied "${value}" to clipboard!`);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Naell | Links & Communities",
          text: "Check out Naell's official links and communities!",
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          navigator.clipboard.writeText(shareUrl);
          showToast("Profile link copied to clipboard!");
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="app-wrapper">
      {/* Dynamic Background Effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className="app-container">
        <Header
          profile={profileConfig}
          theme={theme}
          onToggleTheme={toggleTheme}
          onShare={handleShare}
        />

        <main className="links-container">
          {profileConfig.socialLinks.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              index={index}
              onCopy={handleCopy}
            />
          ))}
        </main>

        <Footer />
      </div>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

export default App;
