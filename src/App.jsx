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
  const hasPreRolledRef = useRef(false);

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

  const startLoopPlayback = () => {
    if (loopRef.current) {
      loopRef.current.defaultMuted = true;
      loopRef.current.muted = true;
      const playPromise = loopRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleOpeningEnded = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setIsOpeningEnded(true);
    startLoopPlayback();
  };

  const handleOpeningTimeUpdate = () => {
    const el = openingRef.current;
    if (!el) return;

    const duration = el.duration;
    if (duration && duration > 0) {
      // 1. Majukan pemutaran video loop ~0.45s sebelum opening berakhir agar frame sudah aktif
      if (!hasPreRolledRef.current && el.currentTime >= Math.max(0, duration - 0.45)) {
        hasPreRolledRef.current = true;
        startLoopPlayback();
      }

      // 2. Majukan titik pergantian ~0.20s lebih awal agar langsung melanjutkan tanpa jeda frame akhir
      if (!hasEndedRef.current && el.currentTime >= Math.max(0, duration - 0.20)) {
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
        {/* Loop video: berada di layer bawah (z-index: 1), strictly hidden (opacity: 0) sampai opening selesai */}
        <video
          ref={loopRef}
          className={`background-video loop-video ${
            isOpeningEnded && loopReady ? "is-active" : "is-hidden"
          }`}
          src={loopVideo}
          muted
          playsInline
          loop
          preload="auto"
          onLoadedData={() => setLoopReady(true)}
          onCanPlay={() => setLoopReady(true)}
        />

        {/* Opening video: berada di layer atas (z-index: 2), fade-out mulus ke video loop tanpa jeda hitam */}
        <video
          ref={openingRef}
          className={`background-video opening-video ${openingReady ? "is-loaded" : ""} ${
            isOpeningEnded ? "is-ended" : ""
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
