import { initMiniTimeline } from './mini-timeline.js';

document.addEventListener('DOMContentLoaded', () => {
  // Fetch the data
  fetch('/themes/custom/hoeringsportal/assets/timeline-data.json')
    .then(response => response.json())
    .then(data => {
      initMiniTimeline(data.timelineData);
      initScrollTracking();
    });

  const viewToggle = document.getElementById('view-toggle');
  viewToggle?.addEventListener('click', (e) => {
    const isHorizontal = document.body.classList.toggle('view-horizontal');
    e.target.textContent = isHorizontal ? '↕ Vertikal' : '↔ Horisontal';
  });
});

function initScrollTracking() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Handle active state in mini-timeline
        const id = entry.target.id.split('-')[1];
        console.log(`Now viewing item: ${id}`);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
}
