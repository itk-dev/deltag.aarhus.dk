/**
 * @file
 * Set timer for iframe.
 */

const timer = setInterval(function () {
  const element = document.querySelector(".node--type-hearing iframe");
  if (!element) {
    clearInterval(timer);
    return;
  }
  const compStyles = window.getComputedStyle(element);
  const height = parseInt(compStyles.height, 10);
  if (height > 300) {
    // Clear the timer first: a failure below must not leave the interval
    // running and repeat itself every 100ms. The spinner only exists on the
    // hearing reply form, so on any other page there is nothing to remove.
    clearInterval(timer);
    document.querySelector(".spinner")?.remove();
  }
}, 100);
