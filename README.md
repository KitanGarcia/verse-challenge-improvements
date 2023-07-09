## Intro

This is a simple proof of concept for a platform allowing users to login and view their carbon usage over the last 4 years.
This entails rendering over 28,000 data points on a line chart and a heatmap filterable by year.

This repo is an improved version of a project I did for an interview process with Verse. The original version was built very scrappily in 4 days, but I found value in continuing the exercise to improve my skills in D3.js and Jest.

#### The technologies used so far are:

- React
- Next.js
- TypeScript/JavaScript
- Tailwind
- D3.js
- Jest

## Running the project

- To run the project, run `npm run dev`
  - Navigate to [http://localhost:3000](http://localhost:3000) in the browser.
- To run the tests, run `npm run test`

## Notes

This is a very barebones proof of concept, so only a small part will work.

- There is no back end yet. It's coming soon.
- To sign up or log in, simply enter anything in the username and password fields. This stores a cookie which redirects you to the Planning and Procurement page.
- The only page that can be navigated to from the sidebar is Planning and Procurement
- Other than Login, Sign Up, Planning and Procurement, Carbon Intensity is the only other page implemented.
- The Heat Map can be interacted with to applying filtering, but not yet the line chart. That will come soon!
- A docker container was instantiated. Dockerfile can be found at root. The docker image is called docker_main and can be run with `docker run --publish 3000:3000 docker_main`

## Changes Compared to the Original

- Added tests for a more comprehensive test suite in Jest
  - Sidebar and navbar
  - Planning and Procurement page
  - Carbon Intensity
  - Mocking router.push and D3 functions
- Refactored for more readable and maintainable code
- Fixed a small data inconsistency to properly render heatmap rectangles

## What I'll Add Next

- Containerization with Docker
- An actual server supporting registration, log in, and serving the carbon data
  - Come up with a good way to efficiently serve the data
- Come up with a better caching mechanism on the front end
- Exploring other ways to improve visualization performance
- More D3.js features
  - Apply filtering to the line chart
  - Improved readability to the charts
  - Add an optional moving average or spline interpolation to the line chart
  - Add optional bollinger bands to the line chart
  - Tooltips to see the exact date/time and carbon intensity on mouse hover
