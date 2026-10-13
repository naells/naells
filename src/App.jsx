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
  const [isOpeningEnded, setIsOpeningEnded] = useState(false);
  const [openingReady, setOpeningReady] = useState(false);
  const [loopReady, setLoopReady] = useState(false);

  const openingRef = useRef(null);
  const loopRef = useRef(null);
  const hasEndedRef = useRef(false);

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

  const handleOpeningEnded = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setIsOpeningEnded(true);

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
    if (el && el.duration && el.duration > 0) {
      if (el.currentTime >= el.duration - 0.08) {
        handleOpeningEnded();
      }
    }
  };

  useEffect(() => {
    if (isOpeningEnded && openingRef.current) {
      const timer = setTimeout(() => {
        if (openingRef.current) {
          openingRef.current.pause();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpeningEnded]);

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
        {/* Opening video: diputar saat website dibuka / refresh */}
        <video
          ref={openingRef}
          className={`background-video ${openingReady ? "is-loaded" : ""} ${
            isOpeningEnded ? "is-hidden" : "is-active"
          }`}
          src={openingVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setOpeningReady(true)}
          onCanPlay={() => setOpeningReady(true)}
          onEnded={handleOpeningEnded}
          onTimeUpdate={handleOpeningTimeUpdate}
          onError={handleOpeningEnded}
        />

        {/* Loop video: langsung lanjut & looping setelah opening selesai */}
        <video
          ref={loopRef}
          className={`background-video ${loopReady ? "is-loaded" : ""} ${
            isOpeningEnded ? "is-active" : "is-preload"
          }`}
          src={loopVideo}
          muted
          playsInline
          loop
          preload="auto"
          onLoadedData={() => setLoopReady(true)}
          onCanPlay={() => setLoopReady(true)}
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
