document.addEventListener(
  "click",
  function (e) {
    const button = e.target.closest(".open-all");

    if (button) {
      // Find the accordion container after the button
      const accordion = button.nextElementSibling;

      if (accordion) {
        // Find all collapse elements within this accordion
        const collapseElements = accordion.querySelectorAll(".collapse");

        // Check if any are currently hidden
        const anyCollapsed = Array.from(collapseElements).some(
          (el) => !el.classList.contains("show"),
        );

        if (anyCollapsed) {
          // Open all using jQuery
          $(collapseElements).collapse("show");
          button.textContent = button.textContent.replace(
            "Open all",
            "Close all",
          );
        } else {
          // Close all using jQuery
          $(collapseElements).collapse("hide");
          button.textContent = button.textContent.replace(
            "Close all",
            "Open all",
          );
        }
      }
    }
  },
  false,
);
