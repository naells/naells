/**
 * NAELL PORTFOLIO CLIENT LOGIC
 * - Hardware-synchronized Dual Video Playback (Opening -> Loop onPlaying)
 * - Segmented Tab Switcher (Projects, Tech Stack, Connect)
 * - Native Web Share / Copy Toast Notification
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dual Video Playback System
  const openingVideo = document.getElementById("opening-video");
  const loopVideo = document.getElementById("loop-video");
  let transitionStarted = false;

  if (openingVideo && loopVideo) {
    openingVideo.defaultMuted = true;
    openingVideo.muted = true;
    loopVideo.defaultMuted = true;
    loopVideo.muted = true;

    const handleOpeningReady = () => {
      openingVideo.classList.add("is-loaded");
    };

    openingVideo.addEventListener("loadeddata", handleOpeningReady);
    openingVideo.addEventListener("canplay", handleOpeningReady);

    const triggerLoopTransition = () => {
      if (transitionStarted) return;
      transitionStarted = true;

      loopVideo.currentTime = 0;
      const playPromise = loopVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked or postponed:", err);
        });
      }
    };

    // When opening reaches ~40ms before end, trigger loop play
    openingVideo.addEventListener("timeupdate", () => {
      if (!transitionStarted && openingVideo.duration > 0) {
        if (openingVideo.currentTime >= Math.max(0, openingVideo.duration - 0.04)) {
          triggerLoopTransition();
        }
      }
    });

    openingVideo.addEventListener("ended", triggerLoopTransition);
    openingVideo.addEventListener("error", triggerLoopTransition);

    // Instant seamless cut the exact moment loop outputs decoded frames
    loopVideo.addEventListener("playing", () => {
      loopVideo.classList.add("is-active");
      openingVideo.classList.add("is-hidden");

      setTimeout(() => {
        openingVideo.pause();
      }, 150);
    });

    // Start opening video
    const startPlay = openingVideo.play();
    if (startPlay !== undefined) {
      startPlay.catch(() => {});
    }
  }

  // 2. Toast Notification Manager
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  let toastTimer = null;

  const showToast = (msg) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add("visible");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("visible");
    }, 2000);
  };

  // 3. Tab Switcher
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // 4. Share Button
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareUrl = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Naell — Portfolio",
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
    });
  }
});
