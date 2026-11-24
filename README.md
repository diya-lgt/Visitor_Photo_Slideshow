# Visitor Photo Slideshow

A web application built for event or reception displays to collect visitor photos with explicit public display consent, recognize returning visitors, and run an automated public slideshow.

## Features

- **Visitor Check-In & Photo Upload:** Visitors enter their name, select a valid image (`JPG`, `PNG`, `WEBP` up to `5MB`), and check the consent box to upload.
- **Public Display Consent:** Enforces explicit checkbox agreement before any photo is accepted or shown on the public screen.
- **Returning Visitor Recognition:** Matches visitors by normalized name (trimmed, lowercase) so repeat visitors automatically see their past photos combined with new uploads.
- **Automated Public Slideshow:** Displays uploaded visitor photos in a continuous loop with a `3-second` (`3000ms`) interval.
- **Upload Guard & Validation:** Prevents overlapping submissions (`isUploading` lock) and blocks invalid file formats or oversized files.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Persistence:** Browser `localStorage`
- **Version Control:** Git & GitHub

## Setup & Run Instructions

1. **Clone or download the repository:**
   
   git clone [https://github.com/diya-lgt/Visitor_Photo_Slideshow.git](https://github.com/diya-lgt/Visitor_Photo_Slideshow.git)
   cd Visitor_Photo_Slideshow
