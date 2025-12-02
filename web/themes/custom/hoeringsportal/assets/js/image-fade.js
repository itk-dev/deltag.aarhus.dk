require("../css/module/_image-fade.scss");

let imgFadeSelector = document.querySelector(".image-fade");
let firstImage = document.getElementById("img-0");

if (imgFadeSelector && firstImage) {
  setInterval(nextImage, imgFadeSelector.dataset.imageDuration ?? 15000);
  firstImage.classList.add("show");
}

let curImage = 0;
let numImages = document.querySelectorAll(".image-fade img").length;

function nextImage() {
  // Hide old image
  document.getElementById("img-" + curImage).classList.toggle("show");

  // Compute next image
  curImage++;
  if (curImage > numImages - 1) {
    // Reset to first image
    curImage = 0;
  }

  // Show next image
  document.getElementById("img-" + curImage).classList.toggle("show");
}
