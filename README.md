# Running the app
## Prerequisites
- Must run on React 16 or tests will break.
- Must run on Node v12 or higher.

## Starting the app

-  In `/app`, `npm i` to install packages
-  Run `npm start` to build and run the front end on port `3000`
-  Go to http://localhost:3000/.

## Starting the server
-  In `/server`, `npm i` to install packages
-  Run `npm start` to build and run the server on port `4000`
-  Live at http://localhost:4000/.

## Running tests

-  In `/app` run `npm test` to run the tests using `jest`.
-  In `/server` run `npm test` to run the tests using `ava`.

## Documentation

-  JSDoc has been used for documenting the node server. Run `./node_modules/.bin/jsdoc File.js` on any given file to view.

# Decision making
## Accessibility decisions

- Use of lists for tracks. This allows screen reader to understand how many items are in the list, and announce indexing as it reads each item.
    - https://www.w3.org/WAI/WCAG21/Techniques/html/H48
- Use of "role=button" on lists
    - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role?fbclid=IwAR0xEAOiZt5L-Z7wIp3hxp5dV6HaHD9-oGwAe0uLqZz0KuU2W7YcRud-hfk#accessibility_concerns

## Fun decisions
- Didn't use censored versions of track names and albums. Do your best.

## Trade offs
- I considered making separate components for each item at an atomic level (`<TrackItem> > <TrackList> || <SearchBar>`) but decided for something this small I'll have it all in one component to manage state easily.
- Search Bar: I used a separate button and didn't remove the label/add a place holder (typical nice design items) to save time.

- Spent an hour playing with Howler.js wondering why I couldn't get the `sound.stop()` or `sound.pause()` funcs to work. Turns out it doesn't work with React. Ended up using `ReactHowler` which isn't as nice (i.e. stopping functionality is strange to implement).

- Used `create-react-app` to save time. I know it's your fav @Chris.

- In order to auto search items (without pressing search button), I attached the handler onto the `onChange`. This does mean, however, the search bar will be one letter behind. Decided this was an acceptable trade off.
