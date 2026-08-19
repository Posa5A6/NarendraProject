# Hotel Rajshri · Menu Book v16

This build is a visual/interaction pass over the menu-book interface.

## Menu architecture
- `data/menu-main.json` contains the main restaurant menu.
- `data/menu-jain.json` contains the Jain menu supplied by the restaurant.
- The UI reads both files at runtime, so menu content can be updated without rebuilding the page.

## v16 visual changes
- Closed books are clean covers with the supplied Hotel Rajshri logo used directly, without the previous white logo card.
- Category tabs are hidden until a book is opened.
- When opened, category tabs are physically attached to the fore-edge of the book instead of sitting in a separate floating rail.
- Category tabs use consistent dimensions and an active section state.
- The page turn renders the destination spread underneath first, then folds the old physical page over it. This avoids the previous jump/fade feeling.
- Page animation uses compositor-friendly transforms rather than animated blur/filter effects.
- Mobile changes the fore-edge tabs into a compact horizontal index.

Serve the folder through a local web server because the JSON menu files are loaded with `fetch()`.
