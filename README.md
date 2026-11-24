```markdown
# Visitor Photo Slideshow

A web application where visitors enter their name, confirm public display consent, and upload photos to play in a slideshow. Returning visitors also have their previous photos included in the slideshow.

## Features
- Visitor name input, multi-photo selection, and required public-display consent checkbox
- File type (`JPG`, `PNG`, `WEBP`) and size (`<= 5MB`) validation
- Automatic 3-second slideshow playback with slide counter and visitor greeting
- Returning visitor detection by name to include past photos alongside new uploads

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- Browser `localStorage` for prototype persistence

## Setup & Run
1. Open the project folder in **VS Code**.
2. Open `index.html` using **Live Server** or directly in **Google Chrome**.