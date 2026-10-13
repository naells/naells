import React, { useState, useEffect, useRef } from "react";
import { profileConfig } from "./links.config";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import openingVideo from "./assets/opening.mp4";
import loopVideo from "./assets/loop.mp4";

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [openingReady, setOpeningReady] = useState(false);

  const openingRef = useRef(null);
  const loopRef = useRef(null);
  const transitionTriggeredRef = useRef(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");

    if (openingRef.current) {
      openingRef.current.defaultMuted = true;
      openingRef.current.muted = true;
      const playPromise = openingRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  const triggerLoopStart = () => {
    if (transitionTriggeredRef.current) return;
    transitionTriggeredRef.current = true;

    if (loopRef.current) {
      loopRef.current.defaultMuted = true;
      loopRef.current.muted = true;
      loopRef.current.currentTime = 0;
      const playPromise = loopRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleOpeningTimeUpdate = () => {
    const el = openingRef.current;
    if (!el) return;

    const duration = el.duration;
    if (duration && duration > 0) {
      // Saat opening mencapai ~40ms sebelum akhir, mulai play loop
      if (!transitionTriggeredRef.current && el.currentTime >= Math.max(0, duration - 0.04)) {
        triggerLoopStart();
      }
    }
  };

  const handleLoopPlaying = () => {
    // Dipicu saat loop video sudah benar-benar merender frame pertama secara aktif
    setIsLoopActive(true);

    setTimeout(() => {
      if (openingRef.current) {
        openingRef.current.pause();
      }
    }, 150);
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
    <div className="app-layout" data-theme="dark">
      <div className="video-bg-container" aria-hidden="true">
        {/* Opening video: Layer 1, diputar di awal di atas background hitam */}
        <video
          ref={openingRef}
          className={`background-video opening-video ${openingReady ? "is-loaded" : ""} ${
            isLoopActive ? "is-hidden" : ""
          }`}
          src={openingVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setOpeningReady(true)}
          onCanPlay={() => setOpeningReady(true)}
          onEnded={triggerLoopStart}
          onTimeUpdate={handleOpeningTimeUpdate}
          onError={triggerLoopStart}
        />

        {/* Loop video: Layer 2 (on top), strictly 0 opacity sampai onPlaying dipicu */}
        <video
          ref={loopRef}
          className={`background-video loop-video ${isLoopActive ? "is-active" : ""}`}
          src={loopVideo}
          muted
          playsInline
          loop
          preload="auto"
          onPlaying={handleLoopPlaying}
        />
        <div className="video-overlay" />
      </div>

      <div className="mobile-frame">
        <Header
          profile={profileConfig}
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
