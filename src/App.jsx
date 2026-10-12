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
    document.body.setAttribute("data-theme", theme);
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
    }, 2000);
  };

  const handleCopy = (value) => {
    showToast(`Copied ${value}`);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Naell",
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          navigator.clipboard.writeText(shareUrl);
          showToast("Link copied");
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast("Link copied");
    }
  };

  return (
    <div className="app-layout" data-theme={theme}>
      <div className="mobile-frame">
        <Header
          profile={profileConfig}
          theme={theme}
          onToggleTheme={toggleTheme}
          onShare={handleShare}
        />

        <main className="pills-container">
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
