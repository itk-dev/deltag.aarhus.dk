export function initMiniTimeline(data) {
  const container = document.getElementById("mini-timeline");
  if (!container) return;

  data.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "mini-dot";
    btn.title = item.title;

    // Simple color logic based on status
    let color = "#9d9d9d"; // Default
    if (item.status === "completed") color = "#008486";
    if (item.status === "current") color = "#ff5f31";
    if (item.accentColor === "pink") color = "#e91e63";

    btn.style.backgroundColor = color;

    btn.onclick = () => {
      const element = document.getElementById(`item-${item.id}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    container.appendChild(btn);
  });
}
