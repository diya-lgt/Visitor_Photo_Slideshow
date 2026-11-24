# Manual Test Plan & Results

| # | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| 1 | New visitor uploads 2 valid JPG/PNG photos with consent | Slideshow starts and cycles through both photos every 3s | Both photos displayed with counter `Photo 1 of 2` / `Photo 2 of 2` | Pass |
| 2 | Returning visitor enters same name (different casing) + 1 new photo | Previous photos + new photo play together | Prior and new photos merged and played in slideshow | Pass |
| 3 | Upload `.txt`/`.pdf` file or file `> 5MB` | Upload rejected with clear error message | Error message shown; invalid file not added | Pass |
| 4 | Submit without checking consent box | Form does not submit | Browser blocks submission until consent is checked | Pass |