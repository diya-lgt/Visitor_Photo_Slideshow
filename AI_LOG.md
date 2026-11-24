# AI Interaction Log

## 1. Initial Setup & Requirements Breakdown
- **Prompt:** Asked for a step-by-step plan and tech stack for the Visitor Photo Slideshow assignment.
- **Outcome:** Chose a lightweight HTML, CSS, and vanilla JavaScript prototype in VS Code with clear documentation files.

## 2. Upload Form, Validation & Slideshow Implementation
- **Prompt:** Generated initial `index.html`, `style.css`, and `script.js` supporting name input, consent checkbox, file validation, 3-second slideshow, and returning visitor photo history.
- **Outcome:** Working prototype in the browser.

## 3. Mistake 1 — Unsafe HTML Injection in Slide Rendering
- **AI Mistake:** Initial `showSlide()` inserted `${name}` directly via `slideshowScreen.innerHTML`.
- **How I Noticed:** Code review showed that special characters or HTML tags in a visitor name could be interpreted as markup.
- **How I Fixed It:** Replaced `innerHTML` image/name injection with `document.createElement("img")` and `.textContent`.

## 4. Mistake 2 — Overlapping Submissions During File Reading
- **AI Mistake:** Rapidly submitting the form while `FileReader` was still processing could overlap state updates.
- **How I Noticed:** Reviewed async submit flow for concurrent clicks.
- **How I Fixed It:** Added an `isUploading` guard and `try / catch / finally` cleanup in `script.js`.