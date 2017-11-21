This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


This is a project created from https://github.com/shakyShane/egghead-redux-obs and the course [Up and Running with redux-observable](https://egghead.io/courses/up-and-running-with-redux-observable)

## Changes
The course used a separate branch for each video in the lesson. I combined it all into one master branch.
I created 3 stores for the course: users, stories, and beers.
I put all of the ui components on one page. It's not pretty, but its dev code.

I have trouble with too many actions getting called with users and stories.
I am also having trouble with the testing of the epics: the correct call is not made in order to verify that he correct store is updated. Oddly, the UI works in the browser.
