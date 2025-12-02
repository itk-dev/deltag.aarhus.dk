document.addEventListener(
  "click",
  function (e) {
    // Find the closest <a> tag that's inside .flag-wrapper
    const link = e.target.closest(".flag-wrapper");

    if (link) {
      // Find the child div with the flag classes
      const flagDiv = link.querySelector(".flag");

      // Only add animation if action-unflag does NOT exist
      if (flagDiv && !flagDiv.classList.contains("action-unflag")) {
        e.preventDefault();
        link.classList.add("liked");

        // Cleanup class after animation
        window.setTimeout(() => {
          link.classList.remove("liked");
        }, 400);
      } else {
        e.preventDefault();
      }
    }
  },
  true,
);
