// Fetch the PDF ourselves so the overlay can be hidden again when the download
// is ready: a plain download link gives the page no such signal. Without
// JavaScript the button is still an ordinary download link.
const button = document.querySelector(".pdf-button");
const overlay = document.querySelector(".pdf-overlay");

button?.addEventListener("click", async (event) => {
  event.preventDefault();
  overlay.hidden = false;
  try {
    const response = await fetch(button.href);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    const disposition = response.headers.get("Content-Disposition") ?? "";
    const filename = /filename="([^"]+)"/.exec(disposition)?.[1] ?? "report.pdf";

    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });
    document.body.append(link);
    link.click();
    link.remove();
    // Some browsers start the download asynchronously.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error(error);
    alert(button.dataset.errorMessage);
  } finally {
    overlay.hidden = true;
  }
});
