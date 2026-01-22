/**
 * @file
 * Project Timeline JavaScript.
 *
 * Provides view mode toggle, scroll tracking, and carousel navigation.
 */

(function (Drupal, once) {
  "use strict";

  /**
   * Timeline component initialization.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.projectTimeline = {
    attach: function (context) {
      var timelines = once(
        "project-timeline",
        "[data-project-timeline]",
        context,
      );

      timelines.forEach(function (timeline) {
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
    var state = {
      currentView: timeline.dataset.defaultView || "vertical",
      carouselIndex: 0,
      carouselTotal: 0,
      observer: null,
    };

    // Cache DOM elements
    var elements = {
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
      elements.viewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var view = button.dataset.view;
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
      elements.viewButtons.forEach(function (btn) {
        var isSelected = btn.dataset.view === view;
        btn.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      // Toggle panel visibility
      if (view === "vertical") {
        elements.verticalPanel.removeAttribute("hidden");
        elements.horizontalPanel.setAttribute("hidden", "");
      } else {
        elements.horizontalPanel.removeAttribute("hidden");
        elements.verticalPanel.setAttribute("hidden", "");
        updateCarouselPosition();
      }
    }

    /**
     * Initialize mini navigation click handlers.
     */
    function initMiniNavigation() {
      elements.navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          var cardId = link.dataset.navLink;
          var targetCard = timeline.querySelector(
            '[data-card-id="' + cardId + '"]',
          );
          if (targetCard) {
            targetCard.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
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

      var observerOptions = {
        root: null,
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      };

      state.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var cardId = entry.target.dataset.cardId;
            updateActiveNavLink(cardId);
          }
        });
      }, observerOptions);

      elements.cards.forEach(function (card) {
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
      elements.navLinks.forEach(function (link) {
        var isActive = link.dataset.navLink === cardId;
        link.classList.toggle("is-active", isActive);
      });
    }

    /**
     * Initialize carousel navigation.
     */
    function initCarousel() {
      if (elements.carouselPrev) {
        elements.carouselPrev.addEventListener("click", function () {
          goToSlide(state.carouselIndex - 1);
        });
      }

      if (elements.carouselNext) {
        elements.carouselNext.addEventListener("click", function () {
          goToSlide(state.carouselIndex + 1);
        });
      }

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
      index = Math.max(0, Math.min(index, state.carouselTotal - 1));
      state.carouselIndex = index;
      updateCarouselPosition();
    }

    /**
     * Update carousel position and button states.
     */
    function updateCarouselPosition() {
      if (elements.carouselTrack) {
        var offset = state.carouselIndex * -100;
        elements.carouselTrack.style.transform = "translateX(" + offset + "%)";
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

      var touchState = {
        startX: 0,
        startY: 0,
        deltaX: 0,
        isSwiping: false,
      };

      elements.carouselTrack.addEventListener(
        "touchstart",
        function (e) {
          touchState.startX = e.touches[0].clientX;
          touchState.startY = e.touches[0].clientY;
          touchState.isSwiping = false;
        },
        { passive: true },
      );

      elements.carouselTrack.addEventListener(
        "touchmove",
        function (e) {
          touchState.deltaX = e.touches[0].clientX - touchState.startX;
          var deltaY = e.touches[0].clientY - touchState.startY;

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

      elements.carouselTrack.addEventListener("touchend", function () {
        if (touchState.isSwiping) {
          var threshold = 50;
          if (touchState.deltaX > threshold) {
            goToSlide(state.carouselIndex - 1);
          } else if (touchState.deltaX < -threshold) {
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
      timeline.addEventListener("keydown", function (e) {
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
      elements.viewButtons.forEach(function (button) {
        button.addEventListener("keydown", function (e) {
          var buttons = Array.from(elements.viewButtons);
          var currentIndex = buttons.indexOf(button);

          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            var prevIndex =
              (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].focus();
            buttons[prevIndex].click();
          } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            var nextIndex = (currentIndex + 1) % buttons.length;
            buttons[nextIndex].focus();
            buttons[nextIndex].click();
          }
        });
      });
    }
  }
})(Drupal, once);
