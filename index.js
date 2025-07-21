// Text rotation functionality
const texts = document.querySelectorAll("#text-rotator .rotating-text");
let current = 0;

setInterval(() => {
  // hide current
  texts[current].classList.remove("opacity-100");
  texts[current].classList.add("opacity-0");

  // show next
  current = (current + 1) % texts.length;
  texts[current].classList.remove("opacity-0");
  texts[current].classList.add("opacity-100");
}, 5000);

//gallery
const images = [
  "static/images/gallery/tg1.jpeg",
  "static/images/gallery/tablagyan-2.jpeg",
  "static/images/gallery/tablagyan-3.jpeg",
  "static/images/gallery/tablagyan-4.jpeg",
  "static/images/gallery/tablagyan-5.jpeg",
];

let currentIndex = 0;

function setImage(index) {
  currentIndex = index;
  document.getElementById("mainImage").src = images[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  setImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  setImage(currentIndex);
}

const boxes = document.querySelectorAll(".course-box");
const overlay = document.getElementById("overlay");

let activeBox = null;

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    e.stopPropagation();
    if (activeBox && activeBox === box) {
      box.classList.remove("expanded");
      overlay.classList.remove("active");
      activeBox = null;
    } else {
      boxes.forEach((b) => b.classList.remove("expanded"));
      box.classList.add("expanded");
      overlay.classList.add("active");
      activeBox = box;
    }
  });
});

document.addEventListener("click", () => {
  if (activeBox) {
    activeBox.classList.remove("expanded");
    overlay.classList.remove("active");
    activeBox = null;
  }
});

const musicCursor = document.getElementById("music-cursor");

document.addEventListener("mousemove", (e) => {
  musicCursor.style.left = e.clientX + 15 + "px";
  musicCursor.style.top = e.clientY + 25 + "px";
  musicCursor.style.opacity = 1;
});

const music = document.getElementById("background-music");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicIcon.src = "/static/volume-no.png"; // Change icon to 'off'
  } else {
    music.play();
    musicIcon.src = "/static/volume-up.png"; // Change icon to 'on'
  }
  isPlaying = !isPlaying;
}

document.getElementById("music-toggle").addEventListener("click", toggleMusic);

// Auto-play when page loads
window.addEventListener("load", () => {
  music
    .play()
    .then(() => {
      isPlaying = true;
    })
    .catch((err) => {
      console.log("Auto-play blocked:", err);
    });
});
