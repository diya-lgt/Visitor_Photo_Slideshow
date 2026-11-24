const uploadForm = document.getElementById("uploadForm");
const visitorNameInput = document.getElementById("visitorName");
const photoInput = document.getElementById("photoInput");
const consentCheck = document.getElementById("consentCheck");
const statusMsg = document.getElementById("statusMsg");
const slideshowScreen = document.getElementById("slideshowScreen");
const displayVisitorName = document.getElementById("displayVisitorName");
const slideCounter = document.getElementById("slideCounter");

let visitorStore = JSON.parse(localStorage.getItem("visitorPhotos")) || {};

let currentSlides = [];
let currentIndex = 0;
let slideTimer = null;
let isUploading = false;

const SLIDE_DURATION = 3000;
const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderSlide(name, photoSrc, index, total) {
  slideshowScreen.innerHTML = "";
  const img = document.createElement("img");
  img.src = photoSrc;
  img.alt = `${name}'s photo`;
  slideshowScreen.appendChild(img);

  displayVisitorName.textContent = `Welcome, ${name}!`;
  slideCounter.textContent = `Photo ${index + 1} of ${total}`;
}

function startSlideshow(name, photos) {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }

  currentSlides = photos;
  currentIndex = 0;

  if (!currentSlides.length) return;

  renderSlide(name, currentSlides[0], 0, currentSlides.length);

  if (currentSlides.length > 1) {
    slideTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % currentSlides.length;
      renderSlide(name, currentSlides[currentIndex], currentIndex, currentSlides.length);
    }, SLIDE_DURATION);
  }
}

function validateInputs(rawName, files, consentChecked) {
  if (!rawName) return "Please enter your name.";
  if (!consentChecked) return "Please agree to display photos on the public screen.";
  if (!files.length) return "Please select at least one photo.";

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Unsupported file (${file.name}). Only JPG, PNG, and WEBP are allowed.`;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `${file.name} exceeds the ${MAX_SIZE_MB}MB size limit.`;
    }
  }
  return null;
}

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (isUploading) {
    statusMsg.textContent = "Another upload is currently in progress. Please wait...";
    return;
  }

  const rawName = visitorNameInput.value.trim();
  const files = Array.from(photoInput.files);
  const errorMessage = validateInputs(rawName, files, consentCheck.checked);

  if (errorMessage) {
    statusMsg.textContent = errorMessage;
    return;
  }

  isUploading = true;
  statusMsg.textContent = "Processing upload...";

  try {
    const key = rawName.toLowerCase();
    const previousPhotos = visitorStore[key] || [];
    const newPhotos = [];

    for (const file of files) {
      const encoded = await fileToBase64(file);
      newPhotos.push(encoded);
    }

    const updatedPhotos = [...previousPhotos, ...newPhotos];
    visitorStore[key] = updatedPhotos;

    localStorage.setItem("visitorPhotos", JSON.stringify(visitorStore));

    statusMsg.textContent =
      previousPhotos.length > 0
        ? `Welcome back, ${rawName}! Showing ${previousPhotos.length} previous + ${newPhotos.length} new photo(s).`
        : `Uploaded ${newPhotos.length} photo(s) for ${rawName}.`;

    startSlideshow(rawName, updatedPhotos);
    uploadForm.reset();
  } catch (err) {
    statusMsg.textContent = "Could not save photos (browser storage limit reached or read error).";
  } finally {
    isUploading = false;
  }
});