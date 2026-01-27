/**
 * @file
 * Project Timeline JavaScript.
 *
 * Provides view mode toggle, scroll tracking, and carousel navigation.
 */

(function (Drupal, once) {
  "use strict";

  // Constants
  const SWIPE_THRESHOLD = 50;
  const OBSERVER_ROOT_MARGIN = "-30% 0px -30% 0px";
  const CAROUSEL_SLIDE_PERCENT = 100;

  /**
   * Timeline component initialization.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.projectTimeline = {
    attach(context) {
      const timelines = once(
        "project-timeline",
        "[data-project-timeline]",
        context,
      );

      timelines.forEach((timeline) => {
        initTimeline(timeline);
      });
    },
  };

  /**
   * Initialize a single timeline component.
   *
   * @param {HTMLElement} timeline
   *   The timeline container element.
   */
  function initTimeline(timeline) {
    const state = {
      currentView: timeline.dataset.defaultView || "vertical",
      carouselIndex: 0,
      carouselTotal: 0,
      observer: null,
    };

    // Cache DOM elements
    const elements = {
      viewButtons: timeline.querySelectorAll("[data-view]"),
      verticalPanel: timeline.querySelector("#project-timeline-vertical"),
      horizontalPanel: timeline.querySelector("#project-timeline-horizontal"),
      miniNav: timeline.querySelector("[data-mini-nav]"),
      cards: timeline.querySelectorAll("[data-timeline-card]"),
      carouselTrack: timeline.querySelector("[data-carousel-track]"),
      carouselSlides: timeline.querySelectorAll("[data-carousel-slide]"),
      carouselPrev: timeline.querySelector("[data-carousel-prev]"),
      carouselNext: timeline.querySelector("[data-carousel-next]"),
      carouselCurrent: timeline.querySelector("[data-carousel-current]"),
      carouselTotal: timeline.querySelector("[data-carousel-total]"),
      navLinks: timeline.querySelectorAll("[data-nav-link]"),
    };

    state.carouselTotal = elements.carouselSlides.length;

    // Initialize components
    initViewToggle();
    initMiniNavigation();
    initCarousel();
    initScrollTracking();
    initKeyboardNavigation();

    /**
     * Initialize view mode toggle buttons.
     */
    function initViewToggle() {
      elements.viewButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const { view } = button.dataset;
          if (view !== state.currentView) {
            switchView(view);
          }
        });
      });
    }

    /**
     * Switch between vertical and horizontal views.
     *
     * @param {string} view
     *   The view to switch to ('vertical' or 'horizontal').
     */
    function switchView(view) {
      state.currentView = view;

      // Update button states
      elements.viewButtons.forEach((btn) => {
        const isSelected = btn.dataset.view === view;
        btn.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      // Toggle panel visibility
      if (view === "vertical") {
        elements.verticalPanel?.removeAttribute("hidden");
        elements.horizontalPanel?.setAttribute("hidden", "");
      } else {
        elements.horizontalPanel?.removeAttribute("hidden");
        elements.verticalPanel?.setAttribute("hidden", "");
        updateCarouselPosition();
      }
    }

    /**
     * Initialize mini navigation click handlers.
     */
    function initMiniNavigation() {
      elements.navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const { navLink: cardId } = link.dataset;
          const targetCard = timeline.querySelector(
            `[data-card-id="${cardId}"]`,
          );
          targetCard?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      });
    }

    /**
     * Initialize scroll tracking with IntersectionObserver.
     */
    function initScrollTracking() {
      if (!("IntersectionObserver" in window)) {
        return;
      }

      // Track all currently intersecting cards
      const visibleCards = new Set();

      const observerOptions = {
        root: null,
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: 0,
      };

      state.observer = new IntersectionObserver((entries) => {
        // Update the visibility set with changed entries
        // Only track cards that are actually visible (have dimensions)
        entries.forEach((entry) => {
          const { cardId } = entry.target.dataset;
          const rect = entry.boundingClientRect;
          const isVisible = rect.height > 0 && rect.width > 0;

          // Only process events from visible cards (ignore hidden horizontal duplicates)
          if (!isVisible) {
            return;
          }

          if (entry.isIntersecting) {
            visibleCards.add(cardId);
          } else {
            visibleCards.delete(cardId);
          }
        });

        // Find the card that best overlaps the viewport center
        // Prefer the topmost card whose bounds contain the center point
        const viewportCenter = window.innerHeight / 2;
        let bestCardId = null;
        let bestScore = -Infinity;

        visibleCards.forEach((cardId) => {
          // Find the visible card (not the hidden horizontal view duplicate)
          const cards = timeline.querySelectorAll(`[data-card-id="${cardId}"]`);
          const card = Array.from(cards).find(
            (c) => c.getBoundingClientRect().height > 0,
          );
          if (card) {
            const rect = card.getBoundingClientRect();

            // Score based on how well the card covers the viewport center
            // Higher score = card contains or is closer to center
            let score;
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
              // Card contains the center point - highest priority
              // Prefer cards where center is further from the edges (more centered)
              const distFromTop = viewportCenter - rect.top;
              const distFromBottom = rect.bottom - viewportCenter;
              score = 1000 + Math.min(distFromTop, distFromBottom);
            } else {
              // Card doesn't contain center - score by distance
              const cardCenter = rect.top + rect.height / 2;
              score = -Math.abs(cardCenter - viewportCenter);
            }

            if (score > bestScore) {
              bestScore = score;
              bestCardId = cardId;
            }
          }
        });

        if (bestCardId) {
          updateActiveNavLink(bestCardId);
        }
      }, observerOptions);

      elements.cards.forEach((card) => {
        state.observer.observe(card);
      });
    }

    /**
     * Update active state on mini navigation links.
     *
     * @param {string} cardId
     *   The ID of the active card.
     */
    function updateActiveNavLink(cardId) {
      elements.navLinks.forEach((link) => {
        const isActive = link.dataset.navLink === cardId;
        link.classList.toggle("is-active", isActive);
      });
    }

    /**
     * Initialize carousel navigation.
     */
    function initCarousel() {
      elements.carouselPrev?.addEventListener("click", () => {
        goToSlide(state.carouselIndex - 1);
      });

      elements.carouselNext?.addEventListener("click", () => {
        goToSlide(state.carouselIndex + 1);
      });

      // Touch/swipe support
      initTouchNavigation();
    }

    /**
     * Navigate to a specific carousel slide.
     *
     * @param {number} index
     *   The slide index to navigate to.
     */
    function goToSlide(index) {
      // Clamp index to valid range
      const clampedIndex = Math.max(
        0,
        Math.min(index, state.carouselTotal - 1),
      );
      state.carouselIndex = clampedIndex;
      updateCarouselPosition();
    }

    /**
     * Update carousel position and button states.
     */
    function updateCarouselPosition() {
      if (elements.carouselTrack) {
        const offset = state.carouselIndex * -CAROUSEL_SLIDE_PERCENT;
        elements.carouselTrack.style.transform = `translateX(${offset}%)`;
      }

      // Update indicator
      if (elements.carouselCurrent) {
        elements.carouselCurrent.textContent = state.carouselIndex + 1;
      }

      // Update button states
      if (elements.carouselPrev) {
        elements.carouselPrev.disabled = state.carouselIndex === 0;
      }
      if (elements.carouselNext) {
        elements.carouselNext.disabled =
          state.carouselIndex >= state.carouselTotal - 1;
      }
    }

    /**
     * Initialize touch/swipe navigation for carousel.
     */
    function initTouchNavigation() {
      if (!elements.carouselTrack) {
        return;
      }

      const touchState = {
        startX: 0,
        startY: 0,
        deltaX: 0,
        isSwiping: false,
      };

      elements.carouselTrack.addEventListener(
        "touchstart",
        (e) => {
          touchState.startX = e.touches[0].clientX;
          touchState.startY = e.touches[0].clientY;
          touchState.isSwiping = false;
        },
        { passive: true },
      );

      elements.carouselTrack.addEventListener(
        "touchmove",
        (e) => {
          touchState.deltaX = e.touches[0].clientX - touchState.startX;
          const deltaY = e.touches[0].clientY - touchState.startY;

          // Determine if horizontal swipe
          if (
            !touchState.isSwiping &&
            Math.abs(touchState.deltaX) > Math.abs(deltaY)
          ) {
            touchState.isSwiping = true;
          }
        },
        { passive: true },
      );

      elements.carouselTrack.addEventListener("touchend", () => {
        if (touchState.isSwiping) {
          if (touchState.deltaX > SWIPE_THRESHOLD) {
            goToSlide(state.carouselIndex - 1);
          } else if (touchState.deltaX < -SWIPE_THRESHOLD) {
            goToSlide(state.carouselIndex + 1);
          }
        }
        touchState.deltaX = 0;
        touchState.isSwiping = false;
      });
    }

    /**
     * Initialize keyboard navigation.
     */
    function initKeyboardNavigation() {
      timeline.addEventListener("keydown", (e) => {
        // Only handle keyboard navigation when carousel is visible
        if (state.currentView !== "horizontal") {
          return;
        }

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToSlide(state.carouselIndex - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goToSlide(state.carouselIndex + 1);
        }
      });

      // View toggle keyboard navigation
      elements.viewButtons.forEach((button) => {
        button.addEventListener("keydown", (e) => {
          const buttons = Array.from(elements.viewButtons);
          const currentIndex = buttons.indexOf(button);

          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex =
              (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].focus();
            buttons[prevIndex].click();
          } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % buttons.length;
            buttons[nextIndex].focus();
            buttons[nextIndex].click();
          }
        });
      });
    }
  }
})(Drupal, once);
