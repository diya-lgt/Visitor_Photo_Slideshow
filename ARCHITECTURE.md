# Architecture

## Tech Stack & Reasons
- **HTML5 & CSS3:** Simple, responsive layout for visitor check-in and screen slideshow without heavy build tooling.
- **Vanilla JavaScript (ES6+):** Handles file validation, `FileReader` encoding, `localStorage` persistence, and interval-based slide rotation cleanly.

## Data Model
- `visitorStore` (`localStorage` key `"visitorPhotos"`):
  - Key: lowercase visitor name (string), e.g., `"rahul sharma"`
  - Value: array of Base64 data URLs (`string[]`) representing previous and current photos
- Runtime Slideshow State:
  - `currentSlides`: active photo list (`string[]`)
  - `currentIndex`: active slide index (`number`)
  - `slideTimer`: interval ID for 3-second transitions

## Flow Diagram
```mermaid
flowchart TD
    A[Visitor Enters Name + Photos + Consent] --> B[Client Validation: Type, Size, Consent]
    B -->|Invalid| C[Show Error Message]
    B -->|Valid| D[Match Lowercase Name in localStorage]
    D --> E[Merge Previous + New Photos]
    E --> F[Start 3s Slideshow Display]