/**
 * NAELL PORTFOLIO CLIENT LOGIC
 * - Hardware-synchronized Dual Video Playback (Opening -> Loop onPlaying)
 * - One-click Copy & Toast notifications
 * - Active Navigation Scroll Tracking
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

    // Show opening video once first frame is ready
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

    // When opening approaches ~40ms before end, trigger loop play
    openingVideo.addEventListener("timeupdate", () => {
      if (!transitionStarted && openingVideo.duration > 0) {
        if (openingVideo.currentTime >= Math.max(0, openingVideo.duration - 0.04)) {
          triggerLoopTransition();
        }
      }
    });

    openingVideo.addEventListener("ended", triggerLoopTransition);
    openingVideo.addEventListener("error", triggerLoopTransition);

    // Instant seamless cut the exact moment loop outputs running decoded frames
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
      startPlay.catch(() => {
        // Fallback if browser requires interaction
      });
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
    }, 2200);
  };

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const val = el.getAttribute("data-copy");
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Copied: ${val}`);
        }).catch(() => {
          showToast("Copied to clipboard");
        });
      }
    });
  });

  // Contact cards direct click navigation
  document.querySelectorAll(".contact-glass-card[data-link]").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't trigger if user clicked a button inside
      if (e.target.closest("button") || e.target.closest("a")) return;
      const url = card.getAttribute("data-link");
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });

  // 3. Scroll Active Link Tracking
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNav = () => {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
});
